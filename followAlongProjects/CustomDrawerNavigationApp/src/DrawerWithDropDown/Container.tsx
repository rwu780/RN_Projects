import { View, StyleSheet } from "react-native";

interface ContainerProps {
    children?: React.ReactNode;
    backgroundColor?: string;
    style?: object
}

export const Container = ({
    children,
    backgroundColor,
    style
}: ContainerProps) => {
    return (
        <View style={[styles.root, {backgroundColor}, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
      width: '100%',
      height: '100%',
    },
  });