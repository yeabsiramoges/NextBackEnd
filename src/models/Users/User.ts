import { z } from "zod";

const errors = {
    username: 'Title cannot be empty.',
    password: 'Link must be a valid URL.'
}

// Interface Schema
export const User = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().trim().min(8, errors.username),
    password: z.string().trim().min(8, errors.password),
    meetings: z.any()
});

export const UserProperties = User.keyof().Enum;
export type UserProperty = keyof typeof UserProperties

export type User = z.infer<typeof User>;