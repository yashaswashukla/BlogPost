import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import setPrisma from "../middleware/setPrisma";
import { signinSchema, signupSchema } from "@yashaswashukla/blog-post";
import { PrismaClient } from "@prisma/client/edge";

const router = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { prisma: PrismaClient; userId: string };
}>();

router.use("/*", setPrisma);

//Signup route
router.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid input" });
  }
  const password = bcrypt.hashSync(body.password, 8);
  try {
    const currUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: password,
      },
    });
    const token = await sign({ id: currUser.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      token,
      id: currUser.id,
      name: currUser.name,
      email: currUser.email,
    });
  } catch (error) {
    c.status(403);
    return c.json({ message: "An Error Occurred" });
  }
});

//Signin Route

router.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid Inputs" });
  }
  try {
    const currUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!currUser) {
      c.status(403);
      return c.json({ message: "Invalid credentials" });
    }
    const validPass = await bcrypt.compare(body.password, currUser.password);
    if (!validPass) {
      c.status(403);
      return c.json({ message: "Invalid Credentials" });
    }
    const token = await sign({ id: currUser.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      token,
      id: currUser.id,
      name: currUser.name,
      email: currUser.email,
    });
  } catch (error) {
    c.status(403);
    return c.json({ message: "An error Occured" });
  }
});

export default router;
