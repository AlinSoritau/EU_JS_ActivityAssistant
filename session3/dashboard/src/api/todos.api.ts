import axiosClient from "./axiosClient"
import type { Todo } from "../types/todo.types"

export async function getTodos(): Promise<Todo[]> {
    const todos = await axiosClient.get('https://jsonplaceholder.typicode.com/todos')

    return todos.data
}

