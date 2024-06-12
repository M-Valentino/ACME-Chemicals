import type { NextApiRequest, NextApiResponse } from "next";
import nextBase64 from "next-base64";
import { encrypt } from "@/utils/encryption";
import { sql } from "@vercel/postgres";

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

  if (method === "PUT" && headers["content-type"] === "application/json") {
    try {
      let { rows } = await sql`SELECT COUNT(*) FROM users;`;
      const count = parseInt(rows[0].count);
      ({ rows } =
        await sql`INSERT INTO users (id, name, email, password) VALUES (${count}, ${nextBase64.decode(
          name
        )}, ${nextBase64.decode(email)}, ${encrypt(password)});`);

      return response.status(200).json({ message: "success" });
    } catch (error) {
      console.error("Error processing request:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  return response.status(401).json({ message: "not authorized" });
}
