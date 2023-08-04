import { StyleSheet, Text } from "react-native"
import { Container } from "../components/Container"
import { COLORS } from "../assets/color"
import { useEffect, useState } from "react"
import { useRoutes } from "../hooks/useRoutes"
import { RouteNames } from "../routes/index.routes"

export const Welcome = () => {

    const { resetToRoute } = useRoutes();
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        initialize();

    }, [])

    useEffect(() => {
        if (isReady) {
            goToNextRoute()
        }

    }, [isReady])

    const initialize = async () => {
        // Initialize Calls
        setTimeout(() => {
            setIsReady(true)
        }, 500)
    }

    const goToNextRoute = () => {
        resetToRoute(RouteNames.LOGIN);
    }

    return (
        <Container>
            <Text style={{
                flex: 1,
                color: COLORS.md_theme_light_primary,
                fontSize: 80,
                fontWeight: 'bold',
                marginTop: 200,
                textAlign: 'center',
            }}>
                Open Trivia
            </Text>
        </Container>
    )
}
