function CarForm() {
    const handleSubmit = async (event : Promise<void>) => {
        
    };

    return (
        <div>
        Car form

        <form onSubmit={handleSubmit} >
            <input type="text" name="Car Model"></input>
            <textarea>

            </textarea>
            <button type="submit">Save</button>
        </form>
        </div>
    )
}