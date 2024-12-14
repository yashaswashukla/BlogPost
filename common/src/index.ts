import zod, { z } from "zod";
const signupSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().max(15),
  password: zod.string().min(6),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});
const insertSchema = zod.object({
  authorId: zod.string(),
  title: zod.string().min(5),
  content: zod.string(),
});
const updateSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  content: zod.string(),
  published: zod.boolean().optional(),
});

// Type inferencing:
type signupInput = zod.infer<typeof signupSchema>;
type signinInput = zod.infer<typeof signinSchema>;
type insertInput = zod.infer<typeof insertSchema>;
type updateInput = zod.infer<typeof updateSchema>;

export {
  updateSchema,
  insertSchema,
  signinSchema,
  signupSchema,
  signinInput,
  signupInput,
  updateInput,
  insertInput,
};
