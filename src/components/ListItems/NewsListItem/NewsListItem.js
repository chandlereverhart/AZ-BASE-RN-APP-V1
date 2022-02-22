import React from 'react';
// Components
import {Image, TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native-ui-lib';

import Icon from '../../Icon';
// Styles
import Stock3 from '../../../assets/images/stock3.jpg';
import styles from './styles';

const SpecialsListItem = ({onPress, item}) => {
  function getImage() {
    if (item.photoUrl) {
      return {uri: item.photoUrl};
    }

    return Stock3;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <Image source={getImage()} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.textTop}>
            <Text bodyBold>{item.title}</Text>
            <Text grayText>{item.subtitle}</Text>
          </View>
          <View style={styles.textBottom}>
            <Text tiny nobel marginT-12>
              March 1, 2021
            </Text>
          </View>
        </View>
        <Icon
          name="chevron-right"
          type="MaterialCommunityIcons"
          style={styles.icon}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SpecialsListItem;
