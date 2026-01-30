import { supabase } from "../lib/supabase";
import { UserDTO } from "../types/user/userDTO";

export class UserService {
    async createUser(userData: UserDTO) {
        const { error } = await supabase.from('user').insert([userData])
        if (error) {
            console.error("Error creating user:", error.message)
            throw new Error(error.message)
        }

        console.log("User successfully added to the database.")
        return { message: "User created successfully." }
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
}