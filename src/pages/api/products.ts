import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { name, keyword },
    method,
  } = request;
  const { rows } = await sql`SELECT * from products;`;
  console.log(name, keyword, method);

  return response.status(200).json(rows);
};