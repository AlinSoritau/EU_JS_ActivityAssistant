import type { UserObject } from '../types/user.types'
import axiosClient from './axiosClient'

export async function registerUser(userData: UserObject) {
    try {
        const response = await axiosClient.post('/user/register', userData)
        return response.data
    } catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}

export async function getUserData(email: string) : Promise<UserObject> {
    try {
        const response = await axiosClient.get(`/user/${email}`)
        
        return response.data
    } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
    }
}
