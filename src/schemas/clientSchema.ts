import * as z from "zod";


export const creatClientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(10, "Phone number is required"),
});

export const updatClientSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    phone: z.string().min(10, "Phone number is required").optional(),
});

export const clientResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
});

export const clientLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const authSchemaResponse = z.object({
    token: z.string(),
});

export type CreateClientInput = z.infer<typeof creatClientSchema>;
export type UpdateClientInput = z.infer<typeof updatClientSchema>;
export type ClientResponse = z.infer<typeof clientResponseSchema>;
export type ClientLoginInput = z.infer<typeof clientLoginSchema>;
export type AuthSchemaResponse = z.infer<typeof authSchemaResponse>;