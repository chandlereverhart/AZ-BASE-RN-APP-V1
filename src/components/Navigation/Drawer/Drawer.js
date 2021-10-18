import React, {useEffect, useState} from 'react';
// React-Native
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
// Modules
import DeviceInfo from 'react-native-device-info';
import ApplyStyles from '@fyresite/apply-styles';
import routes from './routes';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../../../redux/actions/user';
import {APP_CONFIGURATION} from '../../../variables';
import {useAuth} from '../../../contexts/AuthContext';
// Components
import Icon from '../../Icon';
// Styles
import _styles from './styles';

const Drawer = props => {
  const {user} = useAuth();
  const styles = _styles();
  const {navigation} = props;
  const dispatch = useDispatch();
  const {client} = useSelector(({client}) => ({client}));
  const [buildNumber, setBuildNumber] = useState('0.0');
  const [version, setVersion] = useState('0.0');

  useEffect(() => {
    async function getDeviceInfo() {
      const build = await DeviceInfo.getBuildNumber();
      setBuildNumber(build);
      const _version = await DeviceInfo.getVersion();
      setVersion(_version);
    }

    getDeviceInfo();
  }, []);

  useEffect(() => {}, [user]);

  function handleLogout() {
    dispatch(signOut());
  }

  function handleNavigation(page, params) {
    navigation.navigate(page, params);
  }

  function getActiveRoute() {
    const currentRoute = props.state.routes.slice(-1)[0];
    if (!currentRoute.state) {
      return 'Tabs';
    }

    currentRoute.state.routes.slice(-1)[0].name;
    const name = currentRoute.state.routes.slice(-1)[0].name;
    if (name === 'Webview') return '';
    return name;
  }

  const currentRoute = getActiveRoute();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleSection}>
          {/* <ImageBackground source={{uri: client.logo}} style={styles.topNav} /> */}
          <Image source={{uri: client.logoUrl}} style={styles.topNav} />
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.menu}>
        <ScrollView contentContainerStyle={styles.content}>
          {routes().map((route, index) => {
            if (route.type === 'divider') {
              return <View style={styles.divider} key={`index-${index}`} />;
            }
            return (
              route.active && (
                <View style={styles.section} key={`index-${index}`}>
                  <TouchableOpacity
                    style={ApplyStyles(styles.navigationButton, [
                      {
                        style: styles.activeNavButton,
                        apply: currentRoute === route.route,
                      },
                    ])}
                    onPress={() => handleNavigation(route.route, route.params)}>
                    {route.icon && (
                      <Icon
                        style={ApplyStyles(styles.icon, [
                          {
                            style: styles.activeIcon,
                            apply: currentRoute === route.route,
                          },
                        ])}
                        {...route.icon}
                      />
                    )}
                    <Text
                      style={ApplyStyles(styles.navigationText, [
                        {
                          style: styles.activeText,
                          apply: currentRoute === route.route,
                        },
                      ])}>
                      {route.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            );
          })}
          <View style={styles.divider} />
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                Linking.openURL(
                  `mailto:${APP_CONFIGURATION.content.supportEmail}?subject=Support - ${APP_CONFIGURATION.app.displayName}&body=Device Info: Version: ${version} Build: ${buildNumber}`,
                )
              }>
              <Icon style={styles.icon} name="headset" type="FontAwesome5" />
              <Text style={styles.navigationText}>Support</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />
          {user !== null ? (
            <View style={styles.section}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.navigationButton}>
                <Icon style={styles.icon} name="logout" type="MaterialIcons" />
                <Text style={styles.navigationText}>Logout</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.section}>
              <TouchableOpacity
                onPress={() => handleNavigation('SignIn')}
                style={styles.navigationButton}>
                <Icon style={styles.icon} name="login" type="MaterialIcons" />
                <Text style={styles.navigationText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.divider} />

          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.versionText}>
              Version: {version} Build: {buildNumber}{' '}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Drawer;
