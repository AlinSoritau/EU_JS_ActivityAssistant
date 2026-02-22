import { supabase } from "../lib/supabase";
import { comparePassword } from "../lib/hash";
import { generateToken } from "../lib/jwt";

export class AuthService {
    async loginUser(username: string, password: string) {
        const { data: user, error } = await supabase.from('user').select('*').eq('username', username)
        
        if (error) {
            console.error("Error logging in user:", error.message)
            throw new Error(error.message)
        } else if (user.length === 0) {
            console.warn("No user found with the provided username.")
            return null
        } else if (await comparePassword(password, user[0].password) === false) {
            console.error("Invalid password for user:", username)
            return null
        }
        
        const token = generateToken({ id: user[0].id, username: user[0].username })
        return token
    }
}