import {action, observable, flow} from 'mobx';
import {request} from '../../utils/request';
import {load} from '../../utils/Storage';
import Loading from '../../components/widget/Loading';

const SIZE = 10;

export default class ShopStore {
  page: number = 1;

  @observable
  goodsList: GoodsSimple[] = []; // 用于UI显现, 它的变更必须引起UI重新渲染

  @observable
  refreshing: boolean = false;

  @observable
  top10Category: GoodsCategory[] = [];

  @action
  resetPage = () => {
    this.page = 1;
  };

  requestGoodsList = async () => {
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
      const {data} = await request('goodsList', params);
      if (data?.length) {
        if (this.page === 1) {
          this.goodsList = data;
        } else {
          this.goodsList = [...this.goodsList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.goodsList = [];
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

  @action
  getTop10Category = flow(function* (this: ShopStore) {
    try {
      const {data} = yield request('topTenCategory', {});

      this.top10Category = data;
    } catch (e) {
      console.error(e)
    }
  });
}
