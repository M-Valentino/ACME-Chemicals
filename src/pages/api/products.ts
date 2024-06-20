import { NextApiRequest, NextApiResponse } from "next";
import { jwtIsValid } from "@/utils/encryption";
import nextBase64 from "next-base64";
import { sql } from "@vercel/postgres";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;
  const { userId, name, imgsrc, description, price, size } = request.body;

  if (method === "GET") {
    const { rows } = await sql`SELECT * from products;`;
    return response.status(200).json(rows);
  } else if (method === "PUT") {
    const { rows } = await sql`SELECT isadmin from users WHERE id=${
      userId as string
    };`;
    if (
      rows[0].isadmin &&
      (await jwtIsValid(request, parseInt(userId as string)))
    ) {
      try {
        if (!name || !imgsrc || !description || !price || !size) {
          return response
            .status(400)
            .json({ message: "Missing required fields" });
        }

        await sql`
        INSERT INTO products (name, imgsrc, description, price, size)
        VALUES (${nextBase64.decode(name)}, ${nextBase64.decode(
          imgsrc
        )}, ${nextBase64.decode(description)}, ${parseFloat(
          nextBase64.decode(price)
        )}, ${nextBase64.decode(size)});
      `;

        return response
          .status(200)
          .json({ message: "Product added successfully" });
      } catch (error) {
        console.error("Error inserting product data:", error);
        return response.status(500).json({ message: "Internal server error" });
      }
    }
  }

  return response.status(401).json({ message: "Not authorized" });
};
