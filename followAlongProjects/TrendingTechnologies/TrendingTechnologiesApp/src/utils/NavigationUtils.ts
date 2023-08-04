/**
 * 全局导航跳转工具类
 */

import { StackActions, useNavigation } from "@react-navigation/native"

/**
 * 要传递的参数
 * page 要跳转的页面名
 */

export const goPage(params, page) {
    const navigation = useNavigation();

    if(!navigation) {
        return;
    }
    navigation.navigate(page, {
        ...params,
    })

}

export const goBack(navigation) {
    navigation.goBack();
}

export const resetToHomePage(params) {
    const {navigation} = params;
    navigation.dispatch(StackActions.replace('HomePage', {}))
}