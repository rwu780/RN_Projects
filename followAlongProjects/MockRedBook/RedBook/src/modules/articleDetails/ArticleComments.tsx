import {View, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';
import UserStore from '../../stores/UserStore';
import CommentTile from './CommentTile';
// import 
// import icon_comment from '../../assets/icon_comment.png'

type Props = {
    detail: Article
}

export default ({detail}: Props) => {

    const count = detail.comments?.length || 0
    const { userInfo } = UserStore;

  return (
    <>
      <Text style={styles.commentCountTxt}>{count ? `共${count}条评论` : `暂无评论`}</Text>
      <View style={styles.commentInputLayout}>
        <Image source={{ uri: userInfo.avatar}} style={styles.avatarImg} />
        <TextInput style={styles.commentInput} placeholder={`说点什么吧，万一火了呢~`} />
      </View>
      {!! count && <View style={styles.commentsContainer}>
            {detail.comments?.map((i: ArticleComment, index: number) => {
                return <CommentTile comment={i} key={`${index}`}/>
            })}
            </View>}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  commentCountTxt: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    padding: 16
  },
  commentInputLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  commentInput: {
    flex: 1,
    height: 32,
    marginStart: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 0
  },
  avatarImg: {
    borderRadius: 16,
    width: 32,
    height: 32,
    resizeMode: 'cover'
  },
  commentsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  }
});
