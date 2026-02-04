import type { Todo } from '../types/todo.types'
import * as todosApi from '../api/todos.api'


export async function listTodos(): Promise<Todo[]> {
    const data = await todosApi.getTodos()

    return data
}