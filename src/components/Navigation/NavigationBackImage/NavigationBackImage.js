import React from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet, Image} from 'react-native';
import Icon from '../../Icon';

const styles = StyleSheet.create({
  image: {marginLeft: 10, width: 15, height: 15},
});

const NavigationBackImage = props => {
  const {onPress, isClose} = props;
  return !onPress ? (
    <View padding-10>
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/left-arrow.png')}
        style={styles.image}
        {...props}
      />
    </View>
  ) : (
    <TouchableOpacity {...props} padding-10>
      {isClose ? (
        <Icon
          style={{fontSize: 30, opacity: 0.5}}
          name={'close'}
          type={'MaterialCommunityIcons'}
        />
      ) : (
        <Image
          resizeMode="contain"
          source={require('../../../assets/images/left-arrow.png')}
          style={styles.image}
          {...props}
        />
      )}
    </TouchableOpacity>
  );
};

export default NavigationBackImage;
