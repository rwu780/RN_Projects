type LoginCredential = {
    userName: string,
    password: string
}

type ResponseType = {
    code: number,
    data?: string,
    extra?: any,
    msg: string
}