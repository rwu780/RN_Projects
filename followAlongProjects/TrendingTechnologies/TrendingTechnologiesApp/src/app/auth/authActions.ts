import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {URLS} from '../../constants/url';
import { load, save } from '../../utils/Storage';
import { useAppDispatch } from '../hooks';

const registrationEndpoint = 'uapi/user/registration';
const loginEndpoint = 'https://api.devio.org/uapi/user/login';
const KEY_SAVED_USER = "KEY_SAVED_USER"

export const saveUser = createAsyncThunk(
    'auth/save_user',
    async (userData: userProfile, thunkApi) => {
        console.log(JSON.stringify(userData))
        return await save(KEY_SAVED_USER, JSON.stringify(userData))
    }
)

export const loadUser = createAsyncThunk(
    'auth/load_user',
    async (_, thunkApi) => {
        let cachedUser = await load(KEY_SAVED_USER);
        if (!cachedUser) {
            return thunkApi.rejectWithValue("No User Found")
        }
        const cachedUserJSON = JSON.parse(cachedUser)
        if (!cachedUserJSON) {
            return thunkApi.rejectWithValue("No User Found")
        }
        return thunkApi.fulfillWithValue(cachedUserJSON);
    }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credential: RegisterCredential, thunkApi) => {
    let formData = new FormData();
    formData.append('userName', credential.userName);
    formData.append('password', credential.password);
    formData.append('imoocId', credential.moocId);
    formData.append('orderId', credential.orderNumber);

    let response = handleData(
      fetch(buildParams(URLS.url + URLS.registration.api, formData), {
        method: 'POST',
        body: formData,
        headers: {
          ...URLS.headers,
        },
      }),
    );
    let data = (await response) as ResponseType
    if (data.code !== 0) {
      return thunkApi.rejectWithValue(data.msg);
    }
    return thunkApi.fulfillWithValue("Sucess")
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credential: LoginCredential, thunkApi) => {

    let formData = new FormData();
    formData.append('userName', credential.userName);
    formData.append('password', credential.password);
    let response = handleData(
      fetch(buildParams(URLS.url + URLS.login.api, formData), {
        method: 'POST',
        body: formData,
        headers: {
          ...URLS.headers,
        },
      }),
    );
    let data = (await response) as ResponseType
    if (data.code !== 0) {
      return thunkApi.rejectWithValue(data.msg);
    }
    const userInfo = {
        userName: data.extra?.userName,
        data: data.data,
        imoocId: data.extra?.imoocId,
        avatar: data.extra?.avatar
    } as userProfile

    thunkApi.dispatch(saveUser(userInfo))
    return userInfo;
  },
);

/**
 * 处理接口返回数据
 * @param doAction
 */
function handleData(doAction: Promise<any>) {
  return new Promise((resolve, reject) => {
    doAction
      .then(res => {
        //解析Content-Type 防止将非json数据进行json转换
        const type = res.headers.get('Content-Type');
        if ((type || '').indexOf('json') !== -1) {
          return res.json();
        }
        return res.text();
      })
      .then(result => {
        // console.log(JSON.stringify(result));
        if (typeof result === 'string') {
          throw new Error(result);
        }
        const {code, msg, data: {list = undefined} = {}} = result;
        if (code === 401) {
          //todo 跳转到登录页
          return;
        }
        resolve(list || result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
/**
 * 构建url参数
 * @param url
 * @param params
 * @returns
 */
function buildParams(url: string, params?: {} | string): string {
  let newUrl = new URL(url),
    finalUrl;
  if (typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      newUrl.searchParams.append(key, value as string);
    }
    finalUrl = newUrl.toString();
  } else if (typeof params === 'string') {
    //适配path参数
    finalUrl = url.endsWith('/') ? url + params : url + '/' + params;
  } else {
    finalUrl = newUrl.toString();
  }
  console.log('---buildParams----:', finalUrl);
  return finalUrl;
}
