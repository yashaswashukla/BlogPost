import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer")) {
    c.status(403);
    return c.json({ message: "Invalid Access" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(403);
      return c.json({ message: "Invalid Access" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    console.log(error);
    c.status(401);
    c.json({ message: "An error Occurred" });
  }
});

export default authMiddleware;
