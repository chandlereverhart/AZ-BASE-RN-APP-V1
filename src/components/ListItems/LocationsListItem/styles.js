import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

const styles = () =>
  StyleSheet.create({
    root: {
      paddingVertical: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 8,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOpacity: 2,
      shadowRadius: 2,
      paddingHorizontal: 12,
      marginBottom: 12,
    },
    map: {
      height: 60,
      width: 60,
      borderRadius: 8,
    },
    content: {
      marginLeft: 12,
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    icon: {
      fontSize: 24,
    },
    formattedLocation: {
      marginVertical: 4,
      fontSize: 11,
    },
    textBottom: {
      fontSize: 11,
      fontWeight: '800',
      color: Colors.primary,
    },
  });

export default styles;
