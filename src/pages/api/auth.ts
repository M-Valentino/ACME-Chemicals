import type { NextApiRequest, NextApiResponse } from "next";
import nextBase64 from "next-base64";
import { encrypt, decrypt } from "@/utils/encryption";
import { sql } from "@vercel/postgres";
import { API_MESSAGES } from "@/utils/consts";

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 * @returns
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { headers, method } = request;
  const { name, email, password } = request.body;
  const decodedName = name ? nextBase64.decode(name) : "";
  const decodedEmail = nextBase64.decode(email);
  const decodedPassword = nextBase64.decode(password);

  if (method === "PUT" && headers["content-type"] === "application/json") {
    try {
      let { rows } =
        await sql`SELECT email FROM users WHERE email=${decodedEmail};`;
      if (rows.length !== 0) {
        return response
          .status(401)
          .json({ message: API_MESSAGES.duplicateEmail });
      }
      ({ rows } = await sql`SELECT COUNT(*) FROM users;`);
      const count = parseInt(rows[0].count);
      ({ rows } =
        await sql`INSERT INTO users (id, name, email, password) VALUES (${count}, ${decodedName}, ${decodedEmail}, ${encrypt(
          decodedPassword
        )});`);

      return response.status(200).json({ message: API_MESSAGES.success });
    } catch (error) {
      console.error("Error processing request:", error);
      return response
        .status(500)
        .json({ message: API_MESSAGES.internalServerError });
    }
  } else if (
    method === "POST" &&
    headers["content-type"] === "application/json"
  ) {
    try {
      const { rows } =
        await sql`SELECT * FROM users WHERE email=${decodedEmail};`;
        // If email doesn't exist on db
        if (rows.length === 0) {
          return response
            .status(401)
            .json({ message: API_MESSAGES.incorrectLogin });
        }

      if (decrypt(rows[0].password) === decodedPassword) {
        return response.status(200).json({ message: API_MESSAGES.success });
      } else {
        return response
          .status(401)
          .json({ message: API_MESSAGES.incorrectLogin });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return response
        .status(500)
        .json({ message: API_MESSAGES.internalServerError });
    }
  }

  return response.status(401).json({ message: API_MESSAGES.notAuthorized });
}
