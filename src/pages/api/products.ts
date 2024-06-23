import { NextApiRequest, NextApiResponse } from "next";
import nextBase64 from "next-base64";
import { sql } from "@vercel/postgres";
import { API_MESSAGES } from "@/utils/consts";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { headers, method, query } = request;
  const { sortBy, searchText, minPrice, maxPrice } = query;

  if (headers["content-type"] !== "application/json") {
    return response.status(415).json({ message: API_MESSAGES.notAuthorized });
  }

  if (method === "GET") {
    try {
      let orderBy = "";
      if (sortBy) {
        const sortByDecoded = nextBase64.decode(sortBy as string);
        if (sortByDecoded === "Lowest Price") {
          orderBy = "ORDER BY price ASC";
        } else if (sortByDecoded === "Highest Price") {
          orderBy = "ORDER BY price DESC";
        }
      }
      let priceQuery = "WHERE price BETWEEN 0 AND 300";
      if (minPrice && maxPrice) {
        priceQuery = `WHERE price BETWEEN ${minPrice} AND ${maxPrice}`;
      }
      let textQuery = "";
      if (searchText) {
        const searchTextDecoded = nextBase64.decode(searchText as string);
        textQuery = `AND name ILIKE '%${searchTextDecoded}%'`;
      }
      const queryText = `SELECT * FROM products ${priceQuery} ${textQuery} ${orderBy};`;
      const { rows } = await sql.query(queryText);

      return response.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching products:", error); // Log the error
      return response
        .status(500)
        .json({ message: API_MESSAGES.internalServerError });
    }
  }

  return response.status(401).json({ message: API_MESSAGES.notAuthorized });
};
