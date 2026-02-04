import type { Car } from '../types/car.types'
import axiosClient from './axiosClient'

// get cars
export async function getCars(): Promise<Car[]> {
    const response = await axiosClient.get('/cars')

    return response.data
}

// create car


// update car


//delete car