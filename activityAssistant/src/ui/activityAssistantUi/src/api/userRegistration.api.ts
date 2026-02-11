import type { User } from '../types/user.types'
import axiosClient from './axiosClient'

export async function registerUser(userData: User) {
    try {
        const response = await axiosClient.post('/user/register', userData)
        return response.data
    } catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}