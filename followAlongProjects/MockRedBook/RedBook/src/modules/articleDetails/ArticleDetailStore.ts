import {action, observable} from 'mobx';
import {request} from '../../utils/request';
import {load} from '../../utils/Storage';
import Loading from '../../components/widget/Loading';

export default class ArticleDetailStore {

  @observable
  detail: Article = {} as Article; // 用于UI显现, 它的变更必须引起UI重新渲染


  requestArticleDetail = async (id: number) => {
    Loading.show()

    try {
      const params = {
        id: id,
      };
      const {data} = await request('articleDetail', params);
      console.log(JSON.stringify(data))
      this.detail = data || {} as Article

    } catch (error) {
      console.log(error);
    }
    finally {
        Loading.hide()
    }
  };
}
