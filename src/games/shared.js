import React from "react";

const generateRandomId = (length) => {
  if (length <= 0) {
    return "";
  }

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  // Gera o primeiro caractere, que será sempre uma letra
  const lettersLength = letters.length;
  result += letters.charAt(Math.floor(Math.random() * lettersLength));

  // Gera os caracteres restantes
  const charactersLength = characters.length;
  for (let i = 1; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export { generateRandomId };
