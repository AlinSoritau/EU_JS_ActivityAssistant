import type { User } from '../types/user.types'
import axiosClient from './axiosClient'

export async function loginUser(userData: User) {
    try {
        const response = await axiosClient.post('/auth/login', userData)
        localStorage.setItem('token', `Bearer: ${response.data.token}`)
    } catch (error) {
        console.error('Error logging in user:', error)
        throw error
    }
}