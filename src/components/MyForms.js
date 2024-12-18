import React, { useState } from "react";
import { TextBox, SelectField, RoundedButton, MyCheckBox } from "./inputs";
import { BsTrash } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export const ImageUploadField = ({
  label,
  onFileChange,
  preview,
  onRemove,
}) => {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      {!preview ? (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            onChange={onFileChange}
          />
          <div className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 flex items-center justify-between">
            <span className="text-gray-500">Escolha uma imagem</span>
            <FiUpload className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      ) : (
        <div className="mt-2 flex justify-between px-14 items-center">
          <img
            src={preview}
            alt="Pré-visualização"
            className="max-w-full h-auto rounded-md"
            style={{ maxHeight: "200px" }}
          />
          <RoundedButton
            size="10"
            color="bg-red-300"
            onClick={onRemove}
            textColor="text-paleteOne-100"
            hover=" hover:bg-red-500"
          >
            <BsTrash className="w-6 h-6" />
          </RoundedButton>
        </div>
      )}
    </div>
  );
};

export const VideoUploadField = ({
  label,
  onFileChange,
  preview,
  onRemove,
}) => {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      {!preview ? (
        <div className="relative">
          <input
            type="file"
            accept="video/*"
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            onChange={onFileChange}
          />
          <div className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 flex items-center justify-between">
            <span className="text-gray-500">Escolha um vídeo</span>
            <FiUpload className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <video
            src={preview}
            controls
            className="max-w-full h-auto rounded-md"
            style={{ maxHeight: "200px" }}
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
          <button
            type="button"
            onClick={onRemove}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remover Vídeo
          </button>
        </div>
      )}
    </div>
  );
};

export const GameForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [myBackgroundFile, setMyBackgroundFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [myCoverFile, setMyCoverFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [minPlayers, setMinPlayers] = useState(1);
  const [supportsCPU, setSupportsCPU] = useState(false);

  const handleFileChange = (setPreview, fileType) => (event) => {
    const file = event.target.files[0];
    if (file) {
      if (fileType === "video") {
        setPreview(URL.createObjectURL(file));
      } else {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreview(reader.result);
        };

        reader.readAsDataURL(file);
        if (fileType === "cover") {
          setMyCoverFile(file);
        } else if (fileType === "background") {
          setMyBackgroundFile(file);
        }
      }
    }
  };

  /* const handlePreview = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        const readerTarget = e.target;

        setImage(<Card.Img src={readerTarget.result} />);
        setMyFile(file);
      });

      reader.readAsDataURL(file);
    }
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      background: myBackgroundFile,
      profile: myCoverFile,
      //   videoPreview,
      difficulty,
      maxPlayers,
      minPlayers,
      supportsCPU,
    });
  };

  const handleStarClick = (rating) => {
    setDifficulty(rating);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 overflow-y-auto h-[62vh] custom-scrollbar none-bar mt-3"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Nome do Jogo
          </label>
          <TextBox
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            color="white"
            textColor="text-black"
            className="w-full"
            placeholder="Digite o nome do jogo"
          />
        </div>

        <div className="flex space-x-4 gap-2 ">
          <div>
            <label className="block font-semibold mb-1">Dificuldade</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <FaStar
                  key={rating}
                  className={`cursor-pointer ${
                    rating <= difficulty ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(rating)}
                  size={24}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1 md:block hidden">
            <label htmlFor="supportsCPU" className="font-semibold">
              Suporta CPU
            </label>
            <div className="flex items-center justify-center">
              {supportsCPU ? (
                <MdCheckBox
                  id="supportsCPU"
                  onClick={() => setSupportsCPU(!supportsCPU)}
                  className="text-2xl text-blue-500 cursor-pointer mr-2"
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  id="supportsCPU"
                  onClick={() => setSupportsCPU(!supportsCPU)}
                  className="text-2xl text-gray-400 cursor-pointer mr-2"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="maxPlayers" className="block font-semibold mb-1">
            Número Máximo de Jogadores
          </label>
          <TextBox
            id="maxPlayers"
            name="maxPlayers"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            color="white"
            textColor="text-black"
            className="w-full"
            type="number"
            min="0"
            placeholder="Digite o número máximo de jogadores"
          />
        </div>

        <div>
          <label htmlFor="minPlayers" className="block font-semibold mb-1">
            Número Mínimo de Jogadores
          </label>
          <TextBox
            id="minPlayers"
            name="minPlayers"
            value={minPlayers}
            onChange={(e) => setMinPlayers(e.target.value)}
            color="white"
            textColor="text-black"
            className="w-full"
            type="number"
            min="0"
            placeholder="Digite o número mínimo de jogadores"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold mb-1">
          Descrição do Jogo
        </label>
        <TextBox
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          color="white"
          textColor="text-black"
          className="w-full"
          placeholder="Digite a descrição do jogo"
          textArea={true}
          rows={2}
        />
      </div>

      <ImageUploadField
        label="Imagem de Fundo"
        onFileChange={handleFileChange(setBackgroundPreview, "background")}
        preview={backgroundPreview}
        onRemove={() => setBackgroundPreview(null)}
      />

      <ImageUploadField
        label="Imagem de Capa"
        onFileChange={handleFileChange(setCoverPreview, "cover")}
        preview={coverPreview}
        onRemove={() => setCoverPreview(null)}
      />

      {/* <VideoUploadField
        label="Vídeo de Publicidade"
        onFileChange={handleFileChange(setVideoPreview, 'video')}
        preview={videoPreview}
        onRemove={() => setVideoPreview(null)}
      /> */}

      <div className="space-y-1 flex flex-col justify-center items-center md:hidden">
        <MyCheckBox
          id="supportsCPU"
          checked={supportsCPU}
          onChange={() => setSupportsCPU(!supportsCPU)}
          label="Suporta CPU"
          size="md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enviar Jogo
      </button>
    </form>
  );
};
