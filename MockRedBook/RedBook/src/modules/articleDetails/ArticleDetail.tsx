import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  KeyboardAvoidingView,
  Text,
  SafeAreaView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {observer, useLocalStore} from 'mobx-react';
import ArticleDetailStore from './ArticleDetailStore';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ArticleHeader from './ArticleHeader';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {ImageSlider} from '../../components/slidePager';
import ArticleInfoCard from './ArticleInfoCard';
import ArticleComments from './ArticleComments';
import {TextInput} from 'react-native-gesture-handler';
import Heart from '../../components/Heart';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comments from '../../assets/icon_comment.png';
import icon_edit_comment from '../../assets/icon_edit_comment.png';

type RouteParams = {
  ArticleDetail: {
    id: number;
  };
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const [height, setHeight] = useState(200);

  const store = useLocalStore(() => {
    return new ArticleDetailStore();
  });

  const insets = useSafeAreaInsets();

  const {params} = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {detail} = store;

  useEffect(() => {
    store.requestArticleDetail(params.id);
  }, []);

  useEffect(() => {
    const firstImg = store.detail?.images?.[0];

    if (!firstImg) {
      return;
    }
    console.log(firstImg);

    Image.getSize(firstImg, (width: number, height: number) => {
      const showHeight = (SCREEN_WIDTH * height) / width;
      setHeight(showHeight);
    });
  }, [store.detail?.images]);

  const onBackPressed = () => {
    navigation.pop();
  };

  const renderImages = () => {
    const {images} = detail;

    if (!images?.length) {
      return null;
    }

    console.log(JSON.stringify(images));

    const data: any = images.map(i => {
      return {img: i};
    });

    return (
      <View style={{paddingBottom: 30}}>
        <ImageSlider
          data={data}
          autoPlay={false}
          closeIconColor="white"
          caroselImageStyle={{
            height: height,
          }}
          indicatorContainerStyle={{bottom: -40}}
          inActiveIndicatorStyle={styles.inActiveDot}
          activeIndicatorStyle={styles.activeDot}
          previewImageContainerStyle={{
            flex: 1,
            marginTop: insets.top,
          }}
        />
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View style={styles.bottomLayout}>
        <View style={styles.bottomEditLayout}>
          <Image style={styles.editImg} source={icon_edit_comment} />
          <TextInput
            style={styles.bottomCommentInput}
            placeholder={`说点什么`}
          />
        </View>
        <Heart value={detail.isFavorite} size={30} />
        <Text style={styles.bottomCount}>{detail.favoriteCount}</Text>

        <Image
          source={
            detail.isCollection ? icon_collection_selected : icon_collection
          }
          style={styles.bottomIcon}
        />
        <Text style={styles.bottomCount}>{detail.collectionCount}</Text>
        <Image source={icon_comments} style={styles.bottomIcon} />
        <Text style={styles.bottomCount}>{detail.comments?.length || 0}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.root, {marginTop: insets.top}]}>
      <ArticleHeader
        avatarUrl={detail.avatarUrl}
        onBackPressed={onBackPressed}
        userName={detail.userName}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          marginBottom: 64,

        }}
        behavior="position"
        enabled>
        <ScrollView
          style={{
            marginTop: 30,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          
          >
          {renderImages()}
          <ArticleInfoCard detail={detail} />
          <ArticleComments detail={detail} />
        </ScrollView>
        {renderBottom()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#ff2442',
    borderRadius: 3,
  },
  inActiveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#C0C0C0',
    borderRadius: 3,
  },
  commentContainer: {
    width: '100%',
  },
  bottomLayout: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bottomCommentInput: {
    height: '100%',
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  bottomCount: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginStart: 8,
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 12,
  },
  bottomEditLayout: {
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    
  },
  editImg: {
    width: 20,
    height: 20
    

  }
});
