import { Context, Next } from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { StatusCode } from "../controllers/userController";

export async function authmiddleware(c: Context, next: Next) {
  try {
    const authorizationHeader = c.req.header("Authorization");
    if (!authorizationHeader) {
      return c.body("Unauthorized: Missing Authorization Header", StatusCode.FORBIDDEN);
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return c.body("Unauthorized: Missing Token", StatusCode.FORBIDDEN);
    }
    if (token !== null || token !== undefined) {
      const decode = await Jwt.verify(token, c.env.JWT_TOKEN);
      if (decode) {
        c.set("userId", decode);
        await next();
      } else {
        return c.body("Unauthroized User", StatusCode.FORBIDDEN);
      }
    } 
  } catch (error) {
    return c.body("Unauthroized ", StatusCode.FORBIDDEN);
  }
}