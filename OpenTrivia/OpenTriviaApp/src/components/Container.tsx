import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const Container = ({children, backgroundColor, style}: ContainerProps) => {
  return (
    <SafeAreaView style={[{flex: 1, backgroundColor}, style]}>{children}</SafeAreaView>
  );
};
