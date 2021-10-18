import {StyleSheet} from 'react-native';
import {DefaultFontHeavy, DefaultFontBook} from '../../../styles';
import {Colors} from 'react-native-ui-lib';

const styles = () =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.Body,
    },
    content: {},
    container: {
      display: 'flex',
      backgroundColor: Colors.Body,
    },
    menu: {
      flex: 1,
      backgroundColor: 'white',
    },
    titleSection: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: Colors.Body,
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center',
      paddingHorizontal: 15,
    },
    topNav: {
      resizeMode: 'contain',
      width: '80%',
      height: 100,
    },

    section: {
      paddingVertical: 10,
    },
    name: {
      color: 'white',
      ...DefaultFontHeavy,
      fontSize: 24,
    },
    email: {
      color: 'white',
      ...DefaultFontBook,
      fontSize: 18,
    },
    divider: {
      width: '100%',
      backgroundColor: 'rgba(151,151,151,0.23)',
      height: 1,
    },

    navigationButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
    },
    icon: {
      color: Colors.IconColor,
      marginRight: 12,
      fontSize: 20,
    },
    activeIcon: {
      color: Colors.primary,
    },
    activeNavButton: {
      backgroundColor: 'rgba(122,122,122,0.1)',
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      width: '90%',
    },
    activeText: {
      color: Colors.primary,
    },
    navigationText: {
      color: Colors.BoldText,
      ...DefaultFontBook,
      fontSize: 14,
    },
    versionText: {
      color: Colors.BoldText,
      ...DefaultFontBook,
      fontSize: 14,
      marginLeft: 16,
    },

    // Social
    socialSection: {
      paddingLeft: 12,
      paddingVertical: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    socialIcon: {
      fontSize: 30,
      marginRight: 12,
    },
    fb: {
      color: '#3b5998',
    },
    twitter: {
      color: '#1da1f2',
    },
    youtube: {
      color: '#FF0000',
    },
    instagram: {
      height: 22,
      width: 22,
    },
  });

export default styles;
