import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Welcome } from "../pages/Welcome";
import Login from "../pages/Login";
import Home from "../pages/Home";

const Stack = createNativeStackNavigator();

export enum RouteNames {
    INITIAL = "Initial",
    LOGIN = "LOGIN",
    HOME = "HOME"


}


export const RootNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name={RouteNames.INITIAL} component={Welcome}/>
            <Stack.Screen name={RouteNames.LOGIN} component={Login} />
            <Stack.Screen name={RouteNames.HOME} component={Home} />
        </Stack.Navigator>

    )
}