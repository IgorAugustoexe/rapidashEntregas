export type Delivery = {
    id: string,
    destiny: string,
    delivered: string | undefined,
    photo: string | undefined,
    userId: string | undefined,
    user: User | undefined
}
export type User = {

    id: string,
    email: string,
    password: string | undefined,
    fullName: string | undefined,
    cpf: string | undefined


}