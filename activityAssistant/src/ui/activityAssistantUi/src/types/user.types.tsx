export type User = {
    username: string
    password: string
}

export type RegisterUserObject = User & {
    email: string
}