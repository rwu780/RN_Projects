import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { componentMemo } from "../utils/componentMemo";
import { Container } from "./Container";
import { COLORS } from "../assets/color";

interface LoaderScreenProps {
    visible: boolean;

}

const LoaderComponent: React.FC<LoaderScreenProps> = ({
    visible
}) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.container}>
                <ActivityIndicator animating={visible} size={'large'} color={COLORS.md_theme_light_primary} />
            </View>
        </Modal>
    )

}

export const Loader = componentMemo(
    LoaderComponent
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.md_theme_light_onSurfaceVariant
    }
})