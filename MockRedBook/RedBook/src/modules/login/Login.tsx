import {
  Image,
  StyleSheet,
  View,
  Text,
  Linking,
  TextInput,
  Platform,
  LayoutAnimation,
  ToastAndroid,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';
import {formatPhone, replaceBlank} from '../../utils/StringUtils';
import {request} from '../../utils/request';
import UserStore from '../../stores/UserStore';

export default () => {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(true);

  const URL = 'http://10.0.0.150/';

  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigateToHomeScreen = () => {
    navigation.replace('MainTab');
  };

  const canLogin = phone?.length === 13 && pwd?.length >= 6;

  const onLoginPressed = async () => {
    if (!canLogin) {
      return;
    }
    // const params = {
    //   name: 'dagongjue',
    //   pwd: '123456',
    // };

    // const { data } = await request('login', params);

    // console.log(`data=${JSON.stringify(data)}`);

    // navigateToHomeScreen();
    
    UserStore.requestLogin(replaceBlank(phone), pwd, (success: boolean) => {
      if (success) {
        navigateToHomeScreen();
      } else {
        Alert.alert(
          "Error",
          "Login Failed"
          
        )
      }
      
    })
  };

  const protocalLayout = () => {
    const styles = StyleSheet.create({
      protocalLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelTxt: {
        fontSize: 12,
        color: '#999',
      },
      protocalText: {
        fontSize: 12,
        color: '#1020ff',
      },
    });
    return (
      <View style={styles.protocalLayout}>
        <TouchableOpacity onPress={() => setCheck(!check)}>
          <Image
            source={check ? icon_selected : icon_unselected}
            style={styles.radioButton}
          />
        </TouchableOpacity>
        <Text style={styles.labelTxt}>我已阅读并同意</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.google.com');
          }}>
          <Text style={styles.protocalText}>
            {`<<用户协议>> 和 <<隐私政策>>`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      protocalLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelTxt: {
        fontSize: 12,
        color: '#999',
      },
      protocalText: {
        fontSize: 12,
        color: '#1020ff',
      },
      otherLoginButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 16,
        color: '#303080',
      },
      icon_arrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [{rotate: '180deg'}],
      },
      wxLoginButtonLayout: {
        width: '100%',
      },
      wxLoginButton: {
        width: '100%',
        flexDirection: 'row',
        height: 56,
        backgroundColor: '#05c160',
        justifyContent: 'center',
        borderRadius: 28,
        alignItems: 'center',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wx_login_txt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      oneKeyLoginButtonLayout: {
        width: '100%',
        marginBottom: 20,
      },
      oneKeyLoginButton: {
        width: '100%',
        flexDirection: 'row',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        borderRadius: 28,
        alignItems: 'center',
      },
      icon_oneKey: {
        width: 40,
        height: 40,
      },
      oneKey_login_txt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      logoMain: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
    });
    return (
      <SafeAreaView style={styles.root}>
        {protocalLayout()}
        {/* <View style={styles.protocalLayout}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image
              source={check ? icon_selected : icon_unselected}
              style={styles.radioButton}
            />
          </TouchableOpacity>
          <Text style={styles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.google.com');
            }}>
            <Text style={styles.protocalText}>
              {`<<用户协议>> 和 <<隐私政策>>`}
            </Text>
          </TouchableOpacity>
        </View> */}
        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() =>
            setLoginType((type: 'input' | 'quick') => {
              LayoutAnimation.easeInEaseOut();
              if (type === 'quick') {
                return 'input';
              }
              return 'quick';
            })
          }>
          <Text style={styles.otherLoginTxt}>其他登陆方式</Text>
          <Image source={icon_arrow} style={styles.icon_arrow} />
        </TouchableOpacity>

        <View style={styles.wxLoginButtonLayout}>
          <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
            <Image source={icon_wx_small} style={styles.icon_wx} />
            <Text style={styles.wx_login_txt}>{`微信登陆`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneKeyLoginButtonLayout}>
          <TouchableOpacity
            style={styles.oneKeyLoginButton}
            activeOpacity={0.7}>
            <Text style={styles.oneKey_login_txt}>{`一键登陆`}</Text>
          </TouchableOpacity>
        </View>
        <Image source={icon_logo_main} style={styles.logoMain} />
      </SafeAreaView>
    );
  };

  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 48,
      },
      pwdLogin: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 72,
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
      },
      country_code_layout: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      country_code_txt: {
        fontSize: 24,
        color: '#bbb',
      },
      icon_triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
      },
      phoneInput: {
        flex: 1,
        height: '100%',
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginStart: 16,
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8,
      },
      pwdInput: {
        marginStart: 0,
        marginRight: 16,
      },
      icon_eye: {
        width: 30,
        height: 30,
        marginLeft: 6,
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      exchangeIcon: {
        width: 16,
        height: 16,
      },
      codeLoginTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
      },
      loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginButtonDisabled: {
        backgroundColor: '#DDDDDD',
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      protocalLayout: {
        width: '100%',
        marginTop: 12,
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
      },
      icon_wx: {
        width: 50,
        height: 50,
        marginEnd: 60,
      },
      icon_qq: {
        width: 50,
        height: 50,
        marginStart: 60,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    });
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.pwdLogin}>{`账户密码登录`}</Text>
        <Text style={styles.tip}>{`未注册的手机号成功登录后将自动注册`}</Text>
        <View style={styles.phoneLayout}>
          <TouchableOpacity style={styles.country_code_layout}>
            <Text style={styles.country_code_txt}>+86</Text>
            <Image source={icon_triangle} style={styles.icon_triangle} />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            placeholder={`请属于手机号码`}
            placeholderTextColor="#bbb"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => setPhone(formatPhone(text))}
          />
        </View>
        <View style={styles.pwdLayout}>
          <TextInput
            style={StyleSheet.compose(styles.phoneInput, styles.pwdInput)}
            placeholder={`请输入密码`}
            placeholderTextColor="#bbb"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={7}
            value={pwd}
            onChangeText={(text: string) => setPwd(text)}
            secureTextEntry={!eyeOpen}
          />
          <TouchableOpacity
            style={styles.country_code_layout}
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}>
            <Image
              source={eyeOpen ? icon_eye_open : icon_eye_close}
              style={styles.icon_eye}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.changeLayout}>
          <Image style={styles.exchangeIcon} source={icon_exchange} />

          <Text style={styles.codeLoginTxt}>{`验证码登录`}</Text>

          <Text style={styles.forgetPwdTxt}>{`忘记密码？`}</Text>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              !canLogin ? styles.loginButtonDisabled : {},
            ]}
            activeOpacity={canLogin ? 0.7 : 1}
            disabled={!canLogin}
            onPress={onLoginPressed}>
            <Text style={styles.loginTxt}>{`登录`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.protocalLayout}>{protocalLayout()}</View>
        <View style={styles.wxqqLayout}>
          <Image source={icon_wx} style={styles.icon_wx} />
          <Image source={icon_qq} style={styles.icon_qq} />
        </View>

        <View
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 74 : 24,
            left: 36,
          }}>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setLoginType('quick');
            }}>
            <Image source={icon_close_modal} style={styles.closeImg} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoMain: {
    width: 200,
    height: 200,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
