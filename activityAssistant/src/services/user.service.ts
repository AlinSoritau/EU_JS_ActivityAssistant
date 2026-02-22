import { supabase } from "../lib/supabase";
import { UserDTO } from "../types/user/userDTO";
import { hashPassword } from "../lib/hash";

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
}