import { observable } from "mobx";
import { request } from "../../utils/request"

const SIZE = 10;

export default class HomeStore {

    page: number = 1;

    @observable
    homeList: ArticleSimple[] = [] // 用于UI显现, 它的变更必须引起UI重新渲染

    requestHomeList = async () => {

        try {
            const params = {
                page: this.page,
                size: SIZE
            }
            const { data } = await request('homeList', params);
            // console.log(JSON.stringify(data))
            this.homeList = data

        } catch (error) {
            console.log(error)
        }

    }

}