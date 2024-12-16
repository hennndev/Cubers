import jwt from "jsonwebtoken"

export const createToken = (email: string, secret: string, maxAge: number) => {
    return jwt.sign({email}, secret, {expiresIn: maxAge})
}