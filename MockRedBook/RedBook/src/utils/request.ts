import axios, { AxiosResponse } from "axios";
import Apis from "../api/Apis";

const instance = axios.create({
    baseURL: 'http://10.0.0.150:7001',
    timeout: 10 * 1000,
});

instance.interceptors.response.use(
    response =>  response,
    error => {
        const { response } = error;
        console.error(response);
        if (response) {
            const { status } = response
            if (status >= 500) {
                // 服务端报错
            } else if (status === 400) {
                // 接口参数异常
            } else if (status === 401) {
                // 登录信息过期，需要重新登陆
            } else {
                // 其他错误类型
            }
        } else {
            // 网络异常
        }
        return Promise.reject(error)
    }

);

export const request = (name: string, params: any): Promise<AxiosResponse<any, any>> => {
    const api = (Apis as any)[name];

    const { url, method} = api;

    if (method === 'get') {
        return get(url, params)
    } else {
        return post(url, params)
    }
}

const get = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
    return instance.get(url, {
        params: params
    })
}

const post = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
    return instance.post(url, params);
}

