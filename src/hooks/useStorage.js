import { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { st } from "../services/firebase";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const uploadFile = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(st, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setError(error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
          resolve(downloadURL);
          return downloadURL;
        }
      );
    });
  };

  const deleteFile = async (path) => {
    try {
      const fileRef = ref(st, path);
      await deleteObject(fileRef);
      setUrl(null);
    } catch (error) {
      setError(error);
    }
  };

  return { progress, error, url, uploadFile, deleteFile };
};

export default useStorage;
