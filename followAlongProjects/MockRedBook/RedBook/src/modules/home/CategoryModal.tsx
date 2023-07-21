import {
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_delete from '../../assets/icon_delete.png';
import {save} from '../../utils/Storage';

type Props = {
  categoryList: Category[];
};

export interface CategoryModalRef {
  show: () => void;
  hide: () => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default forwardRef((props: Props, ref) => {
  const {categoryList} = props;

  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);

  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>();

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const onMyItemPressed = useCallback(
    (item: Category, index: number) => () => {
      if (!edit) {
        return;
      }

      const newMyList = myList.filter(i => i.name !== item.name);
      const copy = {...item, isAdd: false};
      const newOtherList = [...otherList, copy];

      LayoutAnimation.easeInEaseOut();
      setMyList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, myList, otherList],
  );

  const onOtherItemPressed = useCallback(
    (item: Category, index: number) => () => {
      if (!edit) {
        return;
      }

      const newOtherList = otherList.filter(i => i.name !== item.name);
      const copy = {...item, isAdd: true};
      const newMyList = [...myList, copy];

      LayoutAnimation.easeInEaseOut();
      setMyList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, myList, otherList],
  );

  const onEditButtonClicked = () => {
    if (edit) {
      save('categoryList', JSON.stringify([...myList, ...otherList]));
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  useEffect(() => {
    const myFavorites = categoryList.filter(i => i.isAdd);
    const notFavorites = categoryList.filter(i => !i.isAdd);

    setMyList(myFavorites);
    setOtherList(notFavorites);
  }, [categoryList]);

  const renderMyList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleTxt}>{`我的频道`}</Text>
          <Text style={styles.subTitleTxt}>{`点击进入频道`}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={onEditButtonClicked}>
            <Text style={styles.editTxt}>{edit ? `完成编辑` : `进入编辑`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={hide}>
            <Image source={icon_arrow} style={styles.closeImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContent}>
          {myList.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.itemLayout,
                  item.default ? styles.defaultItemLayout : {},
                ]}
                key={`${item.name}-${index}`}
                onPress={onMyItemPressed(item, index)}>
                <Text style={styles.itemTxt}>{item.name}</Text>
                {edit && !item.default && (
                  <Image style={styles.deleteImg} source={icon_delete} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  const renderOtherList = () => {
    return (
      <>
        <View style={[styles.row, {marginTop: 32}]}>
          <Text style={styles.titleTxt}>{`推荐频道`}</Text>
          <Text style={styles.subTitleTxt}>{`点击添加频道`}</Text>
        </View>
        <View style={styles.listContent}>
          {otherList.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.itemLayout}
                key={`${item.name}-${index}`}
                onPress={onOtherItemPressed(item, index)}>
                <Text style={styles.itemTxt}>
                  {edit ? '+ ' + item.name : item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      statusBarTranslucent={true}
      transparent={true}
      animationType="fade"
      onRequestClose={hide}>
      <View style={styles.root}>
        <View
          style={[
            styles.content,
            {marginTop: 48 + insets.top + (StatusBar.currentHeight || 0)},
          ]}>
          {renderMyList()}
          {renderOtherList()}
        </View>
        <View style={styles.mask}></View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparentr',
  },
  content: {
    width: '100%',
    // height: '70%',
    // marginTop: 48 + (StatusBar.currentHeight || 0) + insets.top,
    backgroundColor: 'white',
    paddingBottom: 40,
  },
  mask: {
    width: '100%',
    flex: 1,
    backgroundColor: '#00000060',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginStart: 16,
  },
  subTitleTxt: {
    fontSize: 13,
    color: '#999',
    marginStart: 12,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 10,
    height: 28,
    backgroundColor: '#EEE',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTxt: {
    fontSize: 13,
    color: '#3050ff',
  },
  closeButton: {
    padding: 12,
  },
  closeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemLayout: {
    width: (SCREEN_WIDTH - 80) >> 2,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#EEE',
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 16,
    marginTop: 12,
  },
  defaultItemLayout: {
    backgroundColor: '#EEE',
  },
  itemTxt: {
    fontSize: 16,
    color: '#666',
  },
  deleteImg: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: -6,
    right: -6,
  },
});
