import { request } from "../utils/request";
import { action, flow, observable } from 'mobx'
import { save } from "../utils/Storage";

class UserStore {

    @observable
    userInfo: any;

    @action
    setUserInfo = (info: any) => {
        this.userInfo = info
    }

    requestLogin = flow(function* (
        phone: string, 
        pwd: string, 
        callback: (success: boolean) => void) {
            try {
                const params = {
                    name: phone,
                    pwd: pwd
                };

                const { data } = yield request('login', params)
                

                if (data) {
                    save("userInfo", JSON.stringify(data));
                    this.userInfo = data;
                    callback?.(true)
                } else {
                    this.userInfo = null;
                    callback?.(false);
                }
            } catch (e) {
                console.log(e)
                this.userInfo = null;
                callback?.(false)
            }
    }
    )
}

export default new UserStore();

