import React from 'react';
// Modules
import dayjs from 'dayjs';
// Components
import {TouchableWithoutFeedback} from 'react-native';
import {View, Text, Image, Colors} from 'react-native-ui-lib';
// Styles
import Stock1 from '../../../assets/images/stock1.jpg';
import styles from './styles';

const VideoCard = ({onPress, item}) => {
  const date = dayjs(new Date(item.date));

  function getImage() {
    if (item.thumbnail) {
      return {uri: item.thumbnail};
    }

    return Stock1;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View bg-white style={styles.root}>
        <Image source={getImage()} style={styles.image} />
        <View padding-12>
          <Text cardTitle numberOfLines={1} ellipsizeMode={'tail'}>
            {item.title}
          </Text>
          <View flex row>
            <Text color={Colors.primary} cardHighlight>
              {date.format('MM/DD/YY ')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoCard;
