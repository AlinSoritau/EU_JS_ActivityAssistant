export type MinimalUser = {
    email: string
    password: string
}

export type UserObject = MinimalUser & {
    username: string,
    userId?: string
}