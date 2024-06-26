import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { API_MESSAGES } from "@/utils/consts";
import { jwtIsValid } from "@/utils/encryption";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { headers, method, query } = request;
  const { productId, userId } = query;

  if (headers["content-type"] !== "application/json") {
    return response.status(415).json({ message: API_MESSAGES.notAuthorized });
  }

  if (method === "PUT") {
    if (await jwtIsValid(request, parseInt(userId as string))) {
      await sql`UPDATE users SET cart = array_append(cart, ${
        productId as string
      }) WHERE id=${userId as string};`;
      return response.status(200).json({ message: API_MESSAGES.success });
    }
  }
  return response.status(401).json({ message: "not authorized" });
};
