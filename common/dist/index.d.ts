import zod from "zod";
declare const signupSchema: zod.ZodObject<{
    email: zod.ZodString;
    name: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
declare const signinSchema: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const insertSchema: zod.ZodObject<{
    authorId: zod.ZodString;
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    authorId: string;
    title: string;
    content: string;
}, {
    authorId: string;
    title: string;
    content: string;
}>;
declare const updateSchema: zod.ZodObject<{
    id: zod.ZodString;
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
type signupInput = zod.infer<typeof signupSchema>;
type signinInput = zod.infer<typeof signinSchema>;
type insertInput = zod.infer<typeof insertSchema>;
type updateInput = zod.infer<typeof updateSchema>;
export { updateSchema, insertSchema, signinSchema, signupSchema, signinInput, signupInput, updateInput, insertInput, };
