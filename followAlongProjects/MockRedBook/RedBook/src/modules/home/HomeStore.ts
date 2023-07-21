import {action, observable} from 'mobx';
import {request} from '../../utils/request';
import {load} from '../../utils/Storage';
import { DEFAULT_CATEGORY_LIST } from './CategoryList';
import Loading from '../../components/widget/Loading';

const SIZE = 10;

export default class HomeStore {
  page: number = 1;

  @observable
  homeList: ArticleSimple[] = []; // 用于UI显现, 它的变更必须引起UI重新渲染

  @observable
  refreshing: boolean = false;

  @observable
  categoryList: Category[] = [];

  @action
  resetPage = () => {
    this.page = 1;
  };

  requestHomeList = async () => {
    if (this.refreshing) {
      return;
    }

    Loading.show()
    try {
      this.refreshing = true;
      const params = {
        page: this.page,
        size: SIZE,
      };
      const {data} = await request('homeList', params);
      if (data?.length) {
        if (this.page === 1) {
          this.homeList = data;
        } else {
          this.homeList = [...this.homeList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.homeList = [];
        } else {
          // 没有更多数据
          // console.log("没有更多数据")
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.refreshing = false;
      Loading.hide()
    }
  };

  getCategoryList = async () => {
    try {
      const cachedListStr = await load('categoryList');

      if (cachedListStr) {
        const cachedList = JSON.parse(cachedListStr);
        if (cachedList?.length) {
          this.categoryList = cachedList;
        } else {
          this.categoryList = DEFAULT_CATEGORY_LIST;
        }
      } else {
        this.categoryList = DEFAULT_CATEGORY_LIST;
      }
    } catch (e) {
      this.categoryList = DEFAULT_CATEGORY_LIST;
    }
  };
}
