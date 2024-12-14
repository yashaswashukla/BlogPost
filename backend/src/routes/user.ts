import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import setPrisma from "../middleware/setPrisma";
import { signinSchema, signupSchema } from "@yashaswashukla/blog-post";

const router = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>();

router.use("/*", setPrisma);
const getHashed = async (password: string) => {
  const hashed = await bcrypt.hash(password, 8);
  return hashed;
};

//Signup route
router.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid input" });
  }
  const password = await getHashed(body.password);
  try {
    const currUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: password,
      },
    });
    console.log(currUser);
    const token = await sign({ id: currUser.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ token });
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
  const password = await getHashed(body.password);
  try {
    const currUser = await prisma.user.findUnique({
      where: { email: body.email, password: password },
    });

    if (!currUser) {
      c.status(403);
      return c.json({ message: "Invalid credentials" });
    }
    const token = await sign({ id: currUser.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ token });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ message: "An error Occured" });
  }
});

export default router;
