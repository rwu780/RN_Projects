import {
  StyleSheet,
  Text,
  View,
  Image,
  GestureResponderEvent,
  Pressable
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import MessageStore from './MessageStore';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import icon_group from '../../assets/icon_group.png';
import icon_star from '../../assets/icon_star.png';
import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_comments from '../../assets/icon_comments.png';
import icon_to_top from '../../assets/icon_to_top.png';
import FloatMenu, {FloatMenuRef} from './FloatMenu';
import Empty from '../../components/Empty';

import icon_no_note from '../../assets/icon_no_note.webp'

export default observer(() => {
  const store = useLocalStore(() => {
    return new MessageStore();
  });

  const modalRef = useRef<FloatMenuRef>(null);

  useEffect(() => {
    store.requestMessageList();
    store.requestUnreadMessage();
  }, []);

  const showFloatMenu = (y: number) => {
    console.log(y)
    modalRef.current?.show(y);
  };

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>{`消息`}</Text>
        <View style={styles.groupChatButtonPosition}>
          <Pressable
            style={styles.groupChatButtonLayout}
            onPress={(event: GestureResponderEvent) => {
                console.log("===Pressed")
                const { pageY } = event.nativeEvent
                showFloatMenu(pageY + 48)
                
            }}>
            <Image source={icon_group} style={styles.iconGroup} />
            <Text style={styles.groupChatTxt}>{`群聊`}</Text>
          </Pressable>
        </View>
        <FloatMenu ref={modalRef} />
      </View>
    );
  };

  const renderMessageTile = ({
    item,
    index,
  }: {
    item: MessageListItem;
    index: number;
  }) => {
    const styles = StyleSheet.create({
      item: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      avatarImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        resizeMode: 'cover',
      },
      contentLayout: {
        flex: 1,
        marginHorizontal: 12,
      },
      nameTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
      },
      lastMessageTxt: {
        fontSize: 15,
        color: '#999',
        marginTop: 4,
      },
      rightLayout: {
        alignItems: 'flex-end',
      },
      timeTxt: {
        fontSize: 12,
        color: '#999',
      },
      topTopIcon: {
        width: 8,
        height: 16,
        resizeMode: 'contain',
        marginTop: 4,
      },
    });

    return (
      <View style={styles.item}>
        <Image source={{uri: item.avatarUrl}} style={styles.avatarImg} />
        <View style={styles.contentLayout}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          <Text style={styles.lastMessageTxt}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightLayout}>
          <Text style={styles.timeTxt}>{item.lastMessageTime}</Text>
          <Image style={styles.topTopIcon} source={icon_to_top} />
        </View>
      </View>
    );
  };

  const UnRead = ({count}: {count: number}) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: -6,
          right: -10,
          paddingHorizontal: 8,
          backgroundColor: '#ff2442',
          justifyContent: 'center',
          alignItems: 'center',
          height: 24,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          {count > 99 ? `99+` : count}
        </Text>
      </View>
    );
  };

  const ListHeader = () => {
    const styles = StyleSheet.create({
      headerLayout: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        paddingVertical: 20,
      },
      headerItem: {
        flex: 1,
        alignItems: 'center',
      },
      headerImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
      },
      itemTxt: {
        fontSize: 16,
        color: '#333',
        marginTop: 8,
      },
    });

    const {unread} = store;

    return (
      <View style={styles.headerLayout}>
        <View style={styles.headerItem}>
          <View>
            <Image source={icon_star} style={styles.headerImage} />
            {!!unread?.unreadFavorate && (
              <UnRead count={unread.unreadFavorate} />
            )}
          </View>

          <Text style={styles.itemTxt}>{`赞和收藏`}</Text>
        </View>
        <View style={styles.headerItem}>
          <View>
            <Image source={icon_new_follow} style={styles.headerImage} />
            {!!unread?.newFollow && <UnRead count={unread.newFollow} />}
          </View>
          <Text style={styles.itemTxt}>{`新增关注`}</Text>
        </View>
        <View style={styles.headerItem}>
          <View>
            <Image source={icon_comments} style={styles.headerImage} />
            {!!unread?.comment && <UnRead count={unread.comment} />}
          </View>
          <Text style={styles.itemTxt}>{`评论和@`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{flex: 1}}
        data={store.messageList}
        extraData={store.unread}
        keyExtractor={item => `${item.id}`}
        renderItem={renderMessageTile}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={<Empty icon={icon_no_note} tips='暂无消息' />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
  },
  groupChatButtonPosition: {
    position: 'absolute',
    right: 16,
  },
  groupChatButtonLayout: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGroup: {
    width: 16,
    height: 16,
  },
  groupChatTxt: {
    fontSize: 14,
    color: '#333',
    marginStart: 6,
  },
});
