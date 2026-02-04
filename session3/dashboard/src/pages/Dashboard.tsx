import CarTable from "../components/CarTable"
import type { Todo } from "../types/todo.types"
import { listTodos } from "../services/todos.service"
// TODO add all logic (types, services, apis)
import { useCallback, useEffect, useState } from "react"

function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([])
    
    const cars = [
        {id: "1", name: 'Audi'},
        {id: "2", name: 'Bentley'}
    ]

    const onDelete = (id: string) => {
        console.log("Delete car with id:", id)
        // call a service to delete the car
    }
    
    const loadTodos = useCallback(async () => {
        const todos = await listTodos()
        console.log("Todos from service")
        console.log(todos)

        setTodos(todos)
    }, [])

    useEffect(() => {
        loadTodos()
    }, [])

    return <div>
            <h1>Dashboard</h1>
            <p>Un tablou de bord</p>

            {
                todos.length && todos.map((todo) => todo.title).join(', ')
            }

        </div>
}

export default Dashboard