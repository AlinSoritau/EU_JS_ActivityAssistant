import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GreetDto } from "./types/greet.dto";
import { NumbersDto } from "./types/numbers.dto";
import { UserDTO } from "./types/user.dto";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const usersFilePath = path.join(__dirname, '_data' ,'users.jsonl');

app.get('/hello', (req: Request, res: Response) => {
    res.json({ message: "Hello, Everyone!" })
});

app.post('/hello', (req: Request<{} , {}, GreetDto>, res: Response) => {
    res.json({ message: `Hello ` + req.body.name })
});

app.post('/sum', (req: Request<{} , {}, NumbersDto>, res: Response) => {
    var a = req.body.numberA
    var b = req.body.numberB

    if (isNaN(a)) {
        res.status(400).json({ message: "numberA is not a valid number" });
    }
    if (isNaN(b)) {
        res.status(400).json({ message: "numberB is not a valid number" });
    }

    const sum = req.body.numberA + req.body.numberB;
    res.json({ message: `The sum is: ${sum}` });
});

app.get('/users', (req: Request, res: Response) => {
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    const users = usersData.trim().split('\n').map(line => JSON.parse(line));
    res.json(users);
});

app.post('/users', (req: Request<{}, {}, UserDTO>, res: Response) => {
    const username = req.body.name;
    res.json({message: 'User ' + username + ' was added to the list'})
})

app.post('/users_novalidation', async (req: Request<{}, {}, UserDTO>, res: Response) => {
    const { name, phone, email, age } = req.body;
    const newUser: UserDTO = { name, phone, email, age };
    fs.appendFileSync(usersFilePath, JSON.stringify(newUser) + '\n');
    res.status(201).json({ message: 'User added successfully', user: newUser });
});

app.listen(PORT, () => {
    console.log("app is running on http://localhost:" + PORT)
});