import {action, observable, flow} from 'mobx';
import Loading from '../../components/widget/Loading';
import {request} from '../../utils/request';
import HomeStore from '../home/HomeStore';

const SIZE = 10;
export default class MessageStore {
  page: number = 1;

  @observable
  messageList: MessageListItem[] = [];

  @observable
  refreshing: boolean = false;

  @observable unread: UnRead = {} as UnRead;

  @action
  resetPage = () => {
    this.page = 1;
  };

  requestMessageList = async () => {
    if (this.refreshing) {
      return;
    }

    try {
      Loading.show();
      this.refreshing = true;
      const params = {
        page: this.page,
        size: SIZE,
      };

      const {data} = await request('messageList', params);

      if (data?.length) {
        if (this.page === 1) {
          this.messageList = data;
        } else {
          this.messageList = [...this.messageList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.messageList = [];
        } else {
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.refreshing = false;
      Loading.hide();
    }
  };

  @action
  requestUnreadMessage = flow(function* (this: MessageStore) {
    try {
        const { data } = yield request("unread", {})
        this.unread = data || {}
    } catch (error) {
        console.log(error)
    }
  })
}
