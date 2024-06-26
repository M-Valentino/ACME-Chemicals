import { NextApiRequest, NextApiResponse } from "next";
import { jwtIsValid } from "@/utils/encryption";
import nextBase64 from "next-base64";
import { sql } from "@vercel/postgres";
import { API_MESSAGES } from "@/utils/consts";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { headers, method, query } = request;
  const { productId } = query;
  const { userId, name, imgsrc, description, price, size } = request.body;

  if (headers["content-type"] !== "application/json") {
    return response.status(415).json({ message: API_MESSAGES.notAuthorized });
  }

  if (method === "GET") {
    try {
      if (productId) {
        const queryText = `SELECT * from products WHERE id=${
          productId as string
        };`;
        const { rows } = await sql.query(queryText);

        return response.status(200).json(rows);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return response
        .status(500)
        .json({ message: API_MESSAGES.internalServerError });
    }
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
        const { rows } = await sql`SELECT COUNT(*) FROM products;`;
        const count = parseInt(rows[0].count);
        await sql`
        INSERT INTO products (name, imgsrc, description, price, size, id)
        VALUES (${nextBase64.decode(name)}, ${nextBase64.decode(
          imgsrc
        )}, ${nextBase64.decode(description)}, ${parseFloat(
          nextBase64.decode(price)
        )}, ${nextBase64.decode(size)}, ${count});
      `;

        return response
          .status(200)
          .json({ message: "Product added successfully" });
      } catch (error) {
        console.error("Error inserting product data:", error);
        return response
          .status(500)
          .json({ message: API_MESSAGES.internalServerError });
      }
    }
  }

  return response.status(401).json({ message: API_MESSAGES.notAuthorized });
};
