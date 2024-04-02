import { StyleSheet } from 'react-native';
import { ScrollView, View } from 'native-base';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export interface LayoutProps {
  children: any;
  p?: string;
}

function BaseLayout({ children, p = '2' }: LayoutProps) {
  return (
    <View p={p} style={styles.container}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
}

export default BaseLayout;
