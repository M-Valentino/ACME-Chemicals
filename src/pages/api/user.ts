import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { API_MESSAGES } from "@/utils/consts";
import { jwtIsValid } from "@/utils/encryption";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { headers, method, query } = request;
  const {userId} = query;

  if (method === "GET") {
    if (await jwtIsValid(request, parseInt(userId))) {
      
      const { rows } = await sql`SELECT * from users WHERE id=${userId};`;
      return response
        .status(200)
        .json({ message: API_MESSAGES.success, data: rows });
    }
  }
  return response.status(401).json({ message: "not authorized" });
};