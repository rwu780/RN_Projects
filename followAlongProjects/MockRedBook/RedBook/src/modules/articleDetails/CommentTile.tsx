import {Image, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import Heart from '../../components/Heart';

type Props = {
  comment: ArticleComment;
};
export default ({comment}: Props) => {
  return (
    <View>
      <View style={styles.root}>
        <Image source={{uri: comment.avatarUrl}} style={styles.avatar} />
        <View style={styles.contentLayout}>
          <Text style={styles.authorNameTxt}>{comment.userName}</Text>
          <Text style={styles.commentTxt}>
            {comment.message}
            <Text style={styles.commentDateTimeLocation}>{` ${dayjs(
              comment.dateTime,
            ).format('MM-DD')} ${comment.location}`}</Text>
          </Text>

          {!!comment.children?.length &&
            comment.children.map(
              (subCommnet: ArticleComment, subIndex: number) => {
                return (
                  <View style={styles.subCommentLayout} key={`${subIndex}`}>
                    <Image
                      source={{uri: subCommnet.avatarUrl}}
                      style={styles.avatar}
                    />
                    <View style={styles.contentLayout}>
                      <Text style={styles.authorNameTxt}>
                        {subCommnet.userName}
                      </Text>
                      <Text style={styles.commentTxt}>
                        {subCommnet.message}
                        <Text style={styles.commentDateTimeLocation}>{` ${dayjs(
                          subCommnet.dateTime,
                        ).format('MM-DD')} ${subCommnet.location}`}</Text>
                      </Text>
                    </View>
                    <View style={styles.countLayout}>
                      <Heart value={subCommnet.isFavorite} size={20} />
                      <Text>{subCommnet.favoriteCount}</Text>
                    </View>
                  </View>
                );
              },
            )}
        </View>
        <View style={styles.countLayout}>
          <Heart value={comment.isFavorite} size={20} />
          <Text>{comment.favoriteCount}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
  },
  avatar: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12,
  },
  authorNameTxt: {
    fontSize: 12,
    color: '#999',
  },
  commentTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  commentDateTimeLocation: {
    fontSize: 12,
    color: '#bbb',
  },
  countLayout: {
    alignItems: 'center',
  },
  favoriateCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    width: '100%',
    marginStart: 50,
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  subCommentLayout: {
    flexDirection: 'row',
    marginTop: 12,
  },
});
