import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { name, keyword },
    method,
  } = request;
  console.log(name, keyword, method);

  return response.status(200).json({ query: name + " " + keyword });
};