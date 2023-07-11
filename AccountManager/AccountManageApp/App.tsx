import React, {useState} from 'react';
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
} from 'react-native';
import {GlobalStyles} from './src/theme/styles';
import ScreenHeader from './src/components/ScreenHeader';
import FAB from './src/components/FAB';
import CategoryHeader from './src/components/CategoryHeader';
import CredentialDetail from './src/components/CredentialDetail';
import Credential from './src/data/model/Credential';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [maskedPassword, setMaskedPassword] = useState(true);

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
    LayoutAnimation.easeInEaseOut()
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

  const dummyData = [
    {
      type: 'Bank',
      data: [
        new Credential('2', '2abc', '2pwd', 'Bank'),
        new Credential('3', '3abc', '3pwd', 'Bank'),
        new Credential('4', '4abc', '4pwd', 'Bank'),
      ],
    },
    {
      type: 'Entertainment',
      data: [
        new Credential('5', '2abc', '2pwd', 'Entertainment'),
        new Credential('6', '3abc', '3pwd', 'Entertainment'),
        new Credential('7', '4abc', '4pwd', 'Entertainment'),
      ],
    },
    {
      type: 'Game',
      data: [
        new Credential('8', '2abc', '2pwd', 'Game'),
        new Credential('9', '3abc', '3pwd', 'Game'),
        new Credential('10', '4abc', '4pwd', 'Game'),
      ],
    },
    {
      type: 'Misc',
      data: [
        new Credential('11', '2abc', '2pwd', 'Misc'),
        new Credential('12', '3abc', '3pwd', 'Misc'),
        new Credential('13', '4abc', '4pwd', 'Misc'),
      ],
    },
  ];

  const c = new Credential('1', 'abc', 'pwd', 'Bank');

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader
        switchState={maskedPassword}
        setSwitchState={() => setMaskedPassword(!maskedPassword)}
      />
      <SectionList
        style={styles.sectionListStyle}
        sections={dummyData}
        renderItem={({item, index, section}) => (
          <CredentialDetail
            shouldDisplay={sectionState[section.type]}
            credential={item}
            passwordMasked={maskedPassword}
            onClick={() => {}}
            onLongPress={() => {}}
          />
        )}
        keyExtractor={(item, _) => item.getId()}
        renderSectionHeader={({section}) => (
          <CategoryHeader
            icon={getIconByType(section.type)}
            headerText={section.type}
            isExpand={getSectionState(section.type)}
            expandClicked={() => { updateSectionState(section.type)}}
          />
        )}
        stickySectionHeadersEnabled={false}
      />

      <FAB style={styles.fabStyle} onClick={() => {}} />
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
