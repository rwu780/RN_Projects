import { request } from "../utils/request";
import { flow } from 'mobx'
import { save } from "../utils/Storage";

class UserStore {

    userInfo: any;

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

