import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createToken = (email: string, secret: string, maxAge: number) => {
    return jwt.sign({email}, secret, {expiresIn: maxAge})
}
