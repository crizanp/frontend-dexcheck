import CryptoJS from "crypto-js";

export const encryptSeed = (seedPhrase, password) => {
  return CryptoJS.AES.encrypt(seedPhrase, password).toString();
};

export const decryptSeed = (cipherText, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null; // Return null if decryption fails
  }
};
