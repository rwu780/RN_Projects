import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import {GlobalStyles} from './src/theme/styles';
import ScreenHeader from './src/components/ScreenHeader';
import FAB from './src/components/FAB';
import CategoryHeader from './src/components/CategoryHeader';
import CredentialDetail from './src/components/CredentialDetail';
import {
  Credential,
  CredentialTypes,
  CredentialTypesArray,
} from './src/data/model/Credential';
import AddCredentialScreen from './src/screens/AddCredentialScreen';
import {getCredentials, saveCredential} from './src/util/storage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const addCredentialScreenRef = useRef(null);

  const [maskedPassword, setMaskedPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sectionData, setSectionData] = useState([]);

  const bankIcon = require('./src/assets/icon_bank.png');
  const gameIcon = require('./src/assets/icon_game.png');
  const entertainmentIcon = require('./src/assets/icon_platform.png');
  const miscIcon = require('./src/assets/icon_other.png');

  const [sectionState, setSectionState] = useState({
    Game: true,
    Bank: true,
    Entertainment: false,
    Misc: true,
  });

  const sectionStateValue = (type: string) => {
    if (type === 'Bank') {
      return sectionState.Bank;
    }

    if (type === 'Entertainment') {
      return sectionState.Entertainment;
    }

    if (type === 'Game') {
      return sectionState.Game;
    }

    if (type === 'Misc') {
      return sectionState.Misc;
    }
  };

  const getIconByType = (type: string) => {
    if (type === 'Bank') {
      return bankIcon;
    }

    if (type === 'Entertainment') {
      return entertainmentIcon;
    }

    if (type === 'Game') {
      return gameIcon;
    }

    if (type === 'Misc') {
      return miscIcon;
    }
  };

  const getSectionState = (type: string) => {
    if (type === 'Game') {
      return sectionState.Game;
    }
    if (type === 'Entertainment') {
      return sectionState.Entertainment;
    }

    if (type === 'Bank') {
      return sectionState.Bank;
    }

    return sectionState.Misc;
  };

  const updateSectionState = (type: string) => {
    LayoutAnimation.easeInEaseOut();
    if (type === 'Game') {
      setSectionState(prevState => ({
        ...prevState,
        Game: !sectionState.Game,
      }));
    } else if (type === 'Entertainment') {
      setSectionState(prevState => ({
        ...prevState,
        Entertainment: !sectionState.Entertainment,
      }));
    } else if (type === 'Bank') {
      setSectionState(prevState => ({
        ...prevState,
        Bank: !sectionState.Bank,
      }));
    } else {
      setSectionState(prevState => ({
        ...prevState,
        Misc: !sectionState.Misc,
      }));
    }
  };

  const dismissModal = () => {
    console.log('Close Modal');
    setModalVisible(false);
  };

  const loadData = () => {
    getCredentials()
      .then(data => {
        const accountList = data ? JSON.parse(data) : [];

        const credentialTypes = CredentialTypesArray;
        const sectionListData = credentialTypes.map(ele => ({
          type: ele,
          data: accountList
            .filter(item => item.credentialTypes == ele)
            .map(c => {
              return new Credential(
                c.id,
                c.platform,
                c.username,
                c.password,
                c.credentialTypes,
              );
            }),
        }));
        LayoutAnimation.easeInEaseOut()
        setSectionData(sectionListData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onAccountSaveSuccess = () => {
    loadData();
  };

  const removeCredential = (id: string) => {
    Alert.alert('Warning', 'Do you want to delete?', [
      {
        text: 'Yes',
        onPress: () => {
          deleteData(id);
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  const deleteData = (id: string) => {
    getCredentials().then(data => {
      let accountList = data ? JSON.parse(data) : [];

      accountList = accountList.filter(item => item.id !== id);
      saveCredential(accountList).then(() => {
        loadData();
      });
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={GlobalStyles.colors.primaryBackgroundColor}
      />
      <ScreenHeader
        switchState={!maskedPassword}
        setSwitchState={() => setMaskedPassword(!maskedPassword)}
      />
      <SectionList
        style={styles.sectionListStyle}
        sections={sectionData}
        renderItem={({item, index, section}) => (
          <CredentialDetail
            shouldDisplay={getSectionState(section.type)}
            credential={item}
            passwordMasked={maskedPassword}
            onClick={() => {
              addCredentialScreenRef.current.show(item);
            }}
            onLongPress={() => {
              removeCredential(item.getId());
            }}
          />
        )}
        keyExtractor={(item, index) => `${item.getId()}-${index}`}
        renderSectionHeader={({section}) => (
          <CategoryHeader
            icon={getIconByType(section.type)}
            headerText={section.type}
            isExpand={getSectionState(section.type)}
            expandClicked={() => {
              updateSectionState(section.type);
            }}
          />
        )}
        stickySectionHeadersEnabled={false}
      />

      <FAB
        style={styles.fabStyle}
        onClick={() => {
          addCredentialScreenRef.current.show();
        }}
      />
      <AddCredentialScreen
        ref={addCredentialScreenRef}
        onSave={onAccountSaveSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: GlobalStyles.colors.primaryBackgroundColor,
  },
  fabStyle: {
    position: 'absolute',
    bottom: 64,
    right: 28,
  },
  sectionListStyle: {
    paddingHorizontal: 12,
  },
  separator: {
    height: 10,
  },
});

export default App;
