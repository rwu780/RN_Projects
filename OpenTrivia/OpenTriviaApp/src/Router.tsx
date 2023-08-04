import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { RootNavigator } from "./routes/index.routes"

export const Router = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}