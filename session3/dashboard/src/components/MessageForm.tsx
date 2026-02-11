import { useState } from 'react'

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

    return (
        <div>
        <form onSubmit={handleSubmit} >
            <h3 style={{color: "blue"}}>Enter a custom user message:</h3>
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

export default MessageForm