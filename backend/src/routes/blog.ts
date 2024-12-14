import { Hono } from "hono";
import authMiddleware from "../middleware/authMiddleware";
import setPrisma from "../middleware/setPrisma";
import zod from "zod";

const router = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variable: { userId: string };
}>();

router.use("/*", authMiddleware);
router.use("/*", setPrisma);

// Creating a blog
const insertSchema = zod.object({
  authorId: zod.string(),
  title: zod.string().min(5),
  content: zod.string(),
});

router.post("/", async (c) => {
  const prisma = c.get("prisma");
  const currUser = c.get("userId");
  const body = await c.req.json();
  const { success } = insertSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid Inputs" });
  }
  try {
    const post = await prisma.blog.create({
      data: {
        authorId: currUser,
        title: body.title,
        content: body.content,
      },
    });
    console.log(post);
    c.status(200);
    return c.json({ message: "Blog posted" });
  } catch (error) {
    console.log(error);
    return c.json({ message: "An error occurred" });
  }
});

//Updating a blog
const updateSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  content: zod.string(),
});

router.put("/", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid Inputs" });
  }
  try {
    const isAvailable = await prisma.blog.findUnique({
      where: { id: body.id },
    });
    if (!isAvailable) {
      c.status(403);
      return c.json({ message: "Blog not available" });
    }
    const updatedPost = await prisma.blog.update({
      where: { id: body.id },
      data: { title: body.title, content: body.content },
    });
    console.log(updatedPost);
    c.status(200);
    return c.json({ message: "Update Successful" });
  } catch (error) {
    console.error(error);
    c.status(401);
    return c.json({ message: "An error Occured" });
  }
});

//Get all the post
router.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const page = parseInt(c.req.query("page") || "1", 10);
  const pageSize = parseInt(c.req.query("pageSize") || "10", 10);
  const skip = (page - 1) * pageSize;
  try {
    const allBlogs = await prisma.blog.findMany({
      skip,
      take: pageSize,
    });
    c.status(200);
    return c.json(allBlogs);
  } catch (error) {
    c.status(401);
    return c.json({ message: "An Error Occured" });
  }
});

//Finding a particular post
router.get("/:id", async (c) => {
  const prisma = c.get("prisma");
  const blogId = c.req.param("id");

  try {
    const currBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });
    if (!currBlog) {
      c.status(403);
      return c.json({ message: "Blog not found" });
    }
    c.status(200);
    return c.json(currBlog);
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ message: "An Error occurred" });
  }
});

export default router;
