import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageURISource,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyles} from '../theme/styles';

interface CategoryHeaderProps {
  icon: ImageURISource;
  headerText: string;
  isExpand: boolean;
  expandClicked(): void;
}

export default ({
  icon,
  headerText,
  isExpand,
  expandClicked,
}: CategoryHeaderProps) => {
  const icon_arrow = require('../assets/icon_arrow.png');

  return (
    <View
      style={[
        styles.headerStyle,
        {
          borderBottomLeftRadius: isExpand ? 0 : 12,
          borderBottomRightRadius: isExpand ? 0 : 12,
        },
      ]}>
      <Image source={icon} style={styles.iconStyle} />
      <Text style={styles.headerTextStyle}>{headerText}</Text>
      <TouchableOpacity style={styles.arrowStyle} onPress={expandClicked}>
        <Image
          source={icon_arrow}
          style={[
            styles.arrowImageStyle,
            {transform: [{rotate: isExpand ? '0deg' : '-180deg'}]},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: 46,
    backgroundColor: GlobalStyles.colors.cardBackgroundColor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  headerTextStyle: {
    fontSize: 16,
    color: GlobalStyles.colors.typeTextColor,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  arrowStyle: {
    position: 'absolute',
    right: 0,
    padding: 16,
  },
  arrowImageStyle: {
    width: 20,
    height: 20,
  },
});
