"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.signinSchema = exports.insertSchema = exports.updateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string().min(6),
});
exports.signupSchema = signupSchema;
const signinSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.signinSchema = signinSchema;
const insertSchema = zod_1.default.object({
    title: zod_1.default.string().min(5),
    content: zod_1.default.string(),
});
exports.insertSchema = insertSchema;
const updateSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean().optional(),
});
exports.updateSchema = updateSchema;
