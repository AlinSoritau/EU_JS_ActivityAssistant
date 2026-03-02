import type { MinimalUser } from '../types/user.types'
import axiosClient from './axiosClient'

export async function loginUser(userData: MinimalUser) {
    try {
        const response = await axiosClient.post('/auth/login', userData)
        localStorage.setItem('token', `Bearer: ${response.data.token}`)
        localStorage.setItem('userEmail', userData.email)
    } catch (error) {
        console.error('Error logging in user:', error)
        throw error
    }
}