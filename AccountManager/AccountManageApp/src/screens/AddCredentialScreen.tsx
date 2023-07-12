import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {GlobalStyles} from '../theme/styles';
import ModalHeader from '../components/ModalHeader';
import SaveButton from '../components/SaveButton';
import TextInputWithHeader from '../components/TextInputWithHeader';
import SelectType from '../components/SelectType';
import {Credential, CredentialTypes} from '../data/model/Credential';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {getUUID} from '../util/uuid';
import { getCredentials, saveCredential } from '../util/storage';

interface AddCredentialScreenProps {
  visible: boolean;
  onModalDismiss(): void;
  credential?: Credential;
}

export default forwardRef((props, ref) => {

  const { onSave } = props

  const [visible, setModalVisible] = useState(false);

  const [type, setType] = useState<CredentialTypes>('Game');

  const [id, setId] = useState('');
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isModify, setIsModify] = useState(false);

  const show = (currentCredential: Credential) => {
    setModalVisible(true);
    console.log(currentCredential)
    if (currentCredential) {
      setId(currentCredential.getId())
      setType(currentCredential.getCredentialType())
      setPlatform(currentCredential.getPlatform())
      setUsername(currentCredential.getUserName())
      setPassword(currentCredential.getPassword())
      setIsModify(true)

    } else {
      setId(getUUID());
      setType('Game')
      setPlatform('')
      setUsername('')
      setPassword('')
      setIsModify(false)
    }
  };

  const hide = () => {
    setModalVisible(false);
  };

  const updateType = (type: CredentialTypes) => {
    setType(type);
  };

  useImperativeHandle(ref, () => {
    // 写公开的api
    return {
      show: show,
      hide: hide,
    };
  });

  const onSaveClicked = () => {

    let newCredential = new Credential(id, platform, username, password, type);

    getCredentials().then(data => {
      let accountList = data ? JSON.parse(data) : [];

      if (isModify) {
        accountList = accountList.filter(item => item.id !== id)
      }

      accountList.push(newCredential);
      saveCredential(accountList).then(() => {
        hide()
        onSave()
      })
    })
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={hide}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}>
        <View style={styles.content}>
          <ModalHeader isModify={isModify} onIconClick={hide} />
          <SelectType selectedType={type} onUpdateType={updateType} />
          <TextInputWithHeader
            rootStyle={styles.contentMargin}
            titleText={'Platform'}
            defaultText={platform}
            onTextChanged={text => {
              setPlatform(text);
            }}
          />
          <TextInputWithHeader
            rootStyle={styles.contentMargin}
            titleText={'Username'}
            defaultText={username}
            onTextChanged={text => setUsername(text)}
          />
          <TextInputWithHeader
            rootStyle={styles.contentMargin}
            titleText={'Password'}
            defaultText={password}
            onTextChanged={text => {
              setPassword(text);
            }}
          />
          <View style={{marginTop: 20}}>
            <SaveButton text={'Save'} onClick={onSaveClicked} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: GlobalStyles.colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: GlobalStyles.colors.cardBackgroundColor,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'column',
  },
  contentMargin: {
    marginTop: 16,
  },
});
