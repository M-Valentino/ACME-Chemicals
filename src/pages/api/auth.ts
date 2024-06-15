import type { NextApiRequest, NextApiResponse } from "next";
import nextBase64 from "next-base64";
import { encrypt, decrypt } from "@/utils/encryption";
import { sql } from "@vercel/postgres";
import { API_MESSAGES } from "@/utils/consts";
import {
  emailIsInvalid,
  emailOrNameIsTooLong,
  nameIsInvalid,
  passwordLengthIsInvalid,
} from "@/utils/validations";
let cookie = require("cookie");
let jwt = require("jsonwebtoken");

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
  const { name, email, password, rememberMe } = request.body;
  const decodedName = name ? nextBase64.decode(name) : "";
  const decodedEmail = email ? nextBase64.decode(email) : "";
  const decodedPassword = password ? nextBase64.decode(password) : "";

  const emailAlreadyExists = async () => {
    const { rows } =
      await sql`SELECT email FROM users WHERE email=${decodedEmail};`;
    return rows.length !== 0;
  };

  if (headers["content-type"] !== "application/json") {
    return response.status(401).json({ message: API_MESSAGES.notAuthorized });
  }

  if (method === "PUT") {
    if (
      nameIsInvalid(name.value) ||
      emailOrNameIsTooLong(name.value) ||
      emailIsInvalid(email.value) ||
      emailOrNameIsTooLong(email.value) ||
      passwordLengthIsInvalid(password.value)
    ) {
      return response.status(401).json({ message: API_MESSAGES.notAuthorized });
    }
    try {
      if (await emailAlreadyExists()) {
        return response
          .status(401)
          .json({ message: API_MESSAGES.duplicateEmail });
      }
      let { rows } = await sql`SELECT COUNT(*) FROM users;`;
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
  } else if (method === "POST") {
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
        const sessionInfo = {
          time: Date(),
          userId: rows[0].id,
          name: rows[0].name,
        };
        const token = jwt.sign(sessionInfo, process.env.JWT_SECRET_KEY);
        console.log(rememberMe);
        response.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: rememberMe
              ? // 400 days or 1 day
                1000 * 60 * 60 * 24 * 400
              : 1000 * 60 * 60 * 24,
            sameSite: "strict",
            path: "/",
          })
        );

        return response
          .status(200)
          .json({ message: API_MESSAGES.success, session: sessionInfo });
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
  } else if (method === "GET") {
    try {
      const cookies = cookie.parse(request.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        return response
          .status(401)
          .json({ message: API_MESSAGES.notAuthorized });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return response
        .status(200)
        .json({ message: API_MESSAGES.success, session: decoded });
    } catch (error) {
      console.error("Error verifying token:", error);
      return response
        .status(500)
        .json({ message: API_MESSAGES.internalServerError });
    }
  }

  return response.status(401).json({ message: API_MESSAGES.notAuthorized });
}
