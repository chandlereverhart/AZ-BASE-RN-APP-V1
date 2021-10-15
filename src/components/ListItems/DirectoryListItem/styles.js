import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

const styles = () =>
  StyleSheet.create({
    root: {
      paddingHorizontal: 6,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: 10,
    },
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageContainer: {
      alignSelf: 'center',
      marginRight: 10,
    },
    pointsContainer: {
      marginRight: 20,
      marginLeft: 10,
    },
    directoryContainer: {
      flexGrow: 1,
      marginLeft: 10,
      fontWeight: '100',
    },
    itemCount: {
      marginRight: 20,
      fontSize: 18,
      fontWeight: '700',
    },
    itemCountTop: {
      color: Colors.primary,
    },
    iconContainer: {
      fontWeight: '100',
      width: '40%',
    },
    button: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignSelf: 'center',
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'white',
      width: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    departmentText: {
      fontSize: 16,
      paddingVertical: 3,
      paddingHorizontal: 5,
      textAlign: 'center',
      borderEndWidth: 1,
      borderEndColor: 'black',
      display: 'flex',
    },
    borderRight: {
      borderRightWidth: 0.5,
      borderRightColor: 'grey',
      marginRight: 5,
      opacity: 0.8,
    },
    nameText: {
      fontSize: 12,
      paddingVertical: 3,
      paddingHorizontal: 5,
      textAlign: 'center',
      borderEndWidth: 1,
      borderEndColor: 'black',
      display: 'flex',
    },
    jobText: {
      fontSize: 12,
      paddingVertical: 3,
      paddingHorizontal: 5,
      textAlign: 'center',
      borderEndWidth: 1,
      borderEndColor: 'black',
      display: 'flex',
    },

    directoryCard: {
      backgroundColor: '#f7f7f7',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
    },
    image: {
      backgroundColor: 'white',
      resizeMode: 'contain',
      height: 50,
      width: 50,
      borderRadius: 200 / 2,
    },
    iconFont: {
      fontSize: 35,
      color: 'gray',
    },
  });

export default styles;
