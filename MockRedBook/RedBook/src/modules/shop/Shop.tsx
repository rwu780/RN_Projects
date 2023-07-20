import {StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import { observer, useLocalStore } from "mobx-react"
import ShopStore from "./ShopStore"

import icon_search from '../../assets/icon_search.png'
import icon_shop_cart from '../../assets/icon_shop_cart.png'
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png'
import ShopTitle from "./ShopTitle"
import ShopList from "./ShopList"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export default observer(() => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const store = useLocalStore(() => {
        return new ShopStore();
    })

    useEffect(() => {
        store.requestGoodsList();
        store.getTop10Category();

    }, [])

    const onSearchBarPressed = () => {
        navigation.push('SearchGoods')
    }


    return (
        <View style={styles.root}>
            <ShopTitle onSearchBarPressed={onSearchBarPressed} />
            <ShopList data={store.goodsList} extraData={store.top10Category} />

        </View>
    )
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'

    }
})