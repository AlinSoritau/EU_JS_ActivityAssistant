import type { Car } from "../types/car.types"

type CarTableProps = {
    cars: Car[]
    onDelete: (carId: string) => void
}

function CarTable({ cars, onDelete }: CarTableProps) {
    return <>
        <h3>Car Table Component (Number of cars: {cars.length})</h3>
        <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>


            {cars.map((car) => (
                <tr>
                    <td>{car.id}</td>
                    <td>{car.name}</td>
                    <td> 
                        <button  onClick = {() => onDelete(car.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </table>
    </>
}

export default CarTable