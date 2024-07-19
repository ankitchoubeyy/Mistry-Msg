import {z} from 'zod'

export const usernameValidation = z
.string()
.min(2, "username must me atleast 2 characters")
.max(20, "must be under 20 characters")
.regex(/^[a-zA-Z0-9]+$/, "username does not contain any special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(8,"must contain 8 characters")
})