import type { RegisterUserObject } from '../types/user.types'
import axiosClient from './axiosClient'

export async function registerUser(userData: RegisterUserObject) {
    try {
        const response = await axiosClient.post('/user/register', userData)
        return response.data
    } catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}

export async function loginUser(userData: RegisterUserObject) {
    try {
        debugger
        const response = await axiosClient.post('/user/login', userData)
        return response.data
    } catch (error) {
        debugger
        console.error('Error logging in user:', error)
        throw error
    }
}