import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { URLS } from "../../constants/url";

const registrationEndpoint = "uapi/user/registration"
const loginEndpoint = "https://api.devio.org/uapi/user/login"

export const registerUser = createAsyncThunk(
    'auth/register',
    async initialPost => {
        await setTimeout(() => {
            console.log("Hello")
        }, 100)
        console.log("ABCDEEFF")
        return {}
        // await const response = 
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (credential: LoginCredential) => {
        
        let data = new FormData();
        data.append('userName', credential.userName)
        data.append('password', credential.password)
        let response = handleData(
            fetch(
                buildParams(URLS.url + URLS.login.api, data),
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'content-type': 'multipart/form-data',
                        ...URLS.headers
                    }
                }
            )
        )
        return response;
    }
)

/**
 * 处理接口返回数据
 * @param doAction 
 */
function handleData(doAction: Promise<any>) {
    return new Promise((resolve, reject) => {
        doAction.then((res) => {
            //解析Content-Type 防止将非json数据进行json转换
            const type = res.headers.get('Content-Type');
            if ((type || '').indexOf('json') !== -1) {
                return res.json();
            }
            return res.text();
        }).then((result) => {
            // console.log(JSON.stringify(result));
            if (typeof result === 'string') {
                throw new Error(result);
            }
            const { code, msg, data: { list = undefined } = {} } = result;
            if (code === 401) {
                //todo 跳转到登录页
                return;
            }
            resolve(list || result);
        }).catch((error) => {
            reject(error);
        })
    })
}
/**
 * 构建url参数
 * @param url 
 * @param params 
 * @returns 
 */
function buildParams(url: string, params?: {} | string): string {
    let newUrl = new URL(url), finalUrl;
    if (typeof params === 'object') {
        for (const [key, value] of Object.entries(params)) {
            newUrl.searchParams.append(key, value as string);
        }
        finalUrl = newUrl.toString();
    } else if (typeof params === 'string') {
        //适配path参数
        finalUrl = url.endsWith("/") ? url + params : url + "/" + params;
    } else {
        finalUrl = newUrl.toString();
    }
    console.log('---buildParams----:', finalUrl);
    return finalUrl;
}