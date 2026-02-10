import CarTable from "../components/CarTable"
import type { Todo } from "../types/todo.types"
import type { Conversation } from "../types/conversation.types"
import { listTodos } from "../services/todos.service"
// TODO add all logic (types, services, apis)
import { useCallback, useEffect, useState } from "react"
import { getConversaitons } from "../api/conversations.api"

function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [conversations, setConversations] = useState<Conversation[]>([])
    
    const cars = [
        {id: "1", name: 'Audi'},
        {id: "2", name: 'Bentley'}
    ]

    const onDelete = (id: string) => {
        console.log("Delete car with id:", id)
        // call a service to delete the car
    }
    
    const loadConversations = useCallback(async () => {
        console.log("Retrieving conversations...")
        const conversations = await getConversaitons()
        console.log("Conversations found: ", conversations.length)
        // TODO call a service to get convers)ations

        setConversations(conversations)
    }, [])

    useEffect(() => {
        loadConversations()
    }, [])

    const loadTodos = useCallback(async () => {
        const todos = await listTodos()
        console.log("Todos from service")
        console.log(todos)

        setTodos(todos)
    }, [])

    useEffect(() => {
        loadTodos()
    }, [])

    // return <div>
    //         <h1>Dashboard</h1>
    //         <p>Un tablou de bord</p>

    //         {
    //             todos.length && todos.map((todo) => todo.title).join(', ')
    //         }

    //     </div>

    return <div>
            <h1>Dashboard</h1>
            <p>Un tablou de bord</p>

            {
                conversations.length && conversations.map((conversation) => `${conversation.id} (${conversation.created_at})`).join(', ')
            }

        </div>
}

export default Dashboard