import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

const styles = () =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: Colors.primary,
      marginBottom: 50,
    },
    scrollContent: {
      backgroundColor: Colors.primary,
    },
    topTitle: {
      paddingVertical: 36,
    },
    content: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      flex: 1,
      overflow: 'hidden',
    },
  });

export default styles;
