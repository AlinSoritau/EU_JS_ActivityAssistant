import { useState } from 'react'
import { getConversaitons } from '../api/conversations.api'
import type { Conversation } from '../types/conversation.types'

function MessageForm() {
    const handleSubmit = async (event) => {
        try {
            console.log("Submitting form...")
        }
        catch {
            console.log("Error submitting form")
        }
        finally {
            console.log("Form submission complete")
        }
    }

    const conversations = async () : Promise<Conversation[]> => {
        await getConversaitons().then(result => {
            return result
        }).catch(error => {
            return null
        })
        return []
    }

    var options;

    for (const conversation in conversations) {
        // TODO implement logic to create the options
    }

    return (
        <div>
        <form onSubmit={handleSubmit} >
            <h3 style={{color: "blue"}}>Select conversation</h3>
            <select>

            </select>
        </form>
        </div>
    )
}

export default MessageForm