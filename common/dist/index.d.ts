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
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
declare const updateSchema: zod.ZodObject<{
    id: zod.ZodString;
    title: zod.ZodString;
    content: zod.ZodString;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
    published?: boolean | undefined;
}, {
    title: string;
    content: string;
    id: string;
    published?: boolean | undefined;
}>;
type signupInput = zod.infer<typeof signupSchema>;
type signinInput = zod.infer<typeof signinSchema>;
type insertInput = zod.infer<typeof insertSchema>;
type updateInput = zod.infer<typeof updateSchema>;
export { updateSchema, insertSchema, signinSchema, signupSchema, signinInput, signupInput, updateInput, insertInput, };
