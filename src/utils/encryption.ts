import crypto from "crypto";

const key = Buffer.from(process.env.AES_KEY as string, "hex");
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv("aes-192-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex").concat(encrypted.toString("hex"));
};
