import { useState } from 'react'

function AiMessageForm() {
    const handleSubmit = async (event) => {
        try {
            console.log("Submitting AI message form...")
        }
        catch (error) {
            console.log("Error submitting AI message form:", error)
        }
        finally {
            console.log("AI message form submission complete")
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit} >
            <h3 style={{color: "blue"}}>Ask the AI assistant:</h3>
            <table>
                <tr>
                    <td>
                        <input type="text" name="Add a message:"></input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea>
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit">Send AI message</button>
                    </td>
                </tr>
            </table>
        </form>
        </div>
    )
}

export default AiMessageForm