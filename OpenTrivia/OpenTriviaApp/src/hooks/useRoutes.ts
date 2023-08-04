import { CommonActions, NavigationProp, StackActions, useNavigation, useNavigationState } from "@react-navigation/native"
import { useMemo } from "react";
import { RouteNames } from "../routes/index.routes";

export const useRoutes = () => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const state = useNavigationState((state) => state);

    return useMemo(() => {
        const push = (
            stack: RouteNames,
            screen: any
        ) => {
            const pushAction = StackActions.push(stack, screen);
            navigation.dispatch(pushAction);
        };

        const resetToRoute = (route: RouteNames) => {
            const replaceAction = CommonActions.reset({
                index: 1,
                routes: [{name: route}],
            });
            navigation.dispatch(replaceAction)
        }

        return {
            push,
            resetToRoute
        }
    }, [navigation, state])
}