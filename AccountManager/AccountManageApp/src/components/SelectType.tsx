import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {CredentialTypes, CredentialTypesArray} from '../data/model/Credential';
import {GlobalStyles} from '../theme/styles';

interface SelectTypeProps {
  selectedType: CredentialTypes;
  onUpdateType(type: CredentialTypes): void
}

export default ({selectedType, onUpdateType}: SelectTypeProps) => {
  const typeArray = CredentialTypesArray;

  return (
    <View style={styles.root}>
      {typeArray.map((item, index) => {
        return (
          <TouchableOpacity
            key={`${item}-${index}`}
            style={[
              styles.tab,
              index === 0 ? styles.leftTab : {},
              index === typeArray.length - 1 ? styles.rightTab : {},
              item === selectedType ? styles.selectedBackground : {},
              styles.moveLeft1Px,
            ]}
            onPress={() => {onUpdateType(item)}}
            >
            <Text
              style={[
                styles.tabText,
                item === selectedType ? styles.selectedText : {},
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    margintop: 8,
  },
  tab: {
    flex: 1,
    height: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GlobalStyles.colors.selectTypeColor,
  },
  leftTab: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightTab: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  moveLeft1Px: {
    marginStart: -1,
  },
  tabText: {
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedBackground: {
    backgroundColor: GlobalStyles.colors.selectTypeBackground,
  },
  selectedText: {
    color: GlobalStyles.colors.whiteTextColor,
  },
});
