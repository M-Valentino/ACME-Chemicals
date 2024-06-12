import crypto from "crypto";

const key = Buffer.from(process.env.AES_KEY as string, 'hex');
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv("aes-192-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  console.log(iv.toString("hex").length, encrypted.toString("hex").length);

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
};
