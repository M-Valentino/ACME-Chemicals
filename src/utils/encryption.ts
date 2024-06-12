import crypto from "crypto";

const key = Buffer.from(process.env.AES_KEY as string, "hex");

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-192-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex").concat(encrypted.toString("hex"));
};

export const decrypt = (text: string) => {
  const iv = Buffer.from(text.substring(0, 32), "hex");
  const encryptedPassword = Buffer.from(text.substring(32), "hex");
  const decipher = crypto.createDecipheriv("aes-192-cbc", Buffer.from(key), iv);

  let decrypted = decipher.update(encryptedPassword);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
