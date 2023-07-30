type LoginCredential = {
    userName: string,
    password: string
}

type RegisterCredential = {
    userName: string,
    password: string,
    moocId: string,
    orderNumber: string
}

type ResponseType = {
    code: number,
    data?: string,
    extra?: any,
    msg: string
}

type userProfile = {
    data: string,
    imoocId: string,
    avatar: string,
    userName: string
}