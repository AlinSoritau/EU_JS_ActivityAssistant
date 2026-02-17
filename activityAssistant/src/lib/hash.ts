import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS)
    } catch (error) {
        console.error("Error hashing password: ", error)
        throw new Error("Error hashing password")
    }
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
    } catch (error) {
        console.error("Error comparing password:", error)
        throw new Error("Error comparing password")
    }
}