import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {GlobalStyles} from '../theme/styles';

import { Credential } from '../data/model/Credential';

interface CredentialDetailProps {
  shouldDisplay: boolean;
  credential: Credential;
  passwordMasked: boolean;
  onClick(): void;
  onLongPress(): void;
}

export default ({
  shouldDisplay,
  credential,
  passwordMasked,
  onClick,
  onLongPress,
}: CredentialDetailProps) => {
  if (!shouldDisplay) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.root}
      onLongPress={onLongPress}>
      <Text style={styles.credentialTypeText}>
        {credential.getPlatform()}
      </Text>
      <View style={styles.credentialSetsSection}>
        <Text
          style={
            styles.credentialTexts
          }>{`Username: ${credential.getUserName()}`}</Text>
        <Text style={styles.credentialTexts}>{`Password: ${
          passwordMasked ? '********' : credential.getPassword()
        }`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.cardBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.borderColor,
  },
  credentialTypeText: {
    fontSize: 16,
    color: GlobalStyles.colors.typeTextColor,
    fontWeight: 'bold',
  },
  credentialSetsSection: {
    flexDirection: 'row',
  },
  credentialTexts: {
    flex: 1,
    fontSize: 14,
    color: GlobalStyles.colors.textPasswordColor,
    marginTop: 12,
    marginBottom: 6,
  },
});
