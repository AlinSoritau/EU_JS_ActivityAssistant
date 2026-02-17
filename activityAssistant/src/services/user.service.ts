import { supabase } from "../lib/supabase";
import { UserDTO } from "../types/user/userDTO";
import { hashPassword, comparePassword } from "../lib/hash";
import { generateToken } from "../lib/jwt";

export class UserService {
    async createUser(userData: UserDTO) {
        const hashedPassword = await hashPassword(userData.password)
        const { error } = await supabase.from('user').insert([{...userData, password: hashedPassword}])
        if (error) {
            console.error("Error creating user:", error.message)
            throw new Error(error.message)
        }

        console.log("User successfully added to the database.")
        return { message: "User created successfully." }
    }

    async updateUser(username: string, updatedData: Partial<UserDTO>) {
        console.log("Updating user:", username, "with data:", updatedData)
        // TODO add implementation
    }

    async deleteUser(username: string) {
        const { error } = await supabase.from('user').delete().eq('username', username)
        if (error) {
            console.error("Error deleting user:", error.message)
            throw new Error(error.message)
        }
        console.log("User successfully deleted from the database.")
        return { message: "User deleted successfully." }
    }

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