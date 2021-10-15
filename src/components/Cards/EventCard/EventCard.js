import React from 'react';
// Modules
import dayjs from 'dayjs';
// Components
import {TouchableWithoutFeedback} from 'react-native';
import {View, Text, Image, Colors} from 'react-native-ui-lib';
// Styles
import Stock1 from '../../../assets/images/stock1.jpg';
import styles from './styles';

const EventCard = ({onPress, item}) => {
  const date = dayjs(new Date(item.date.seconds * 1000));
  const from = dayjs(new Date(item.startTime.seconds * 1000));
  const end = dayjs(new Date(item.endTime.seconds * 1000));
  function getImage() {
    if (item.fileUrl) {
      return {uri: item.fileUrl};
    }

    return Stock1;
  }
  // console.log('CARD', item);

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
            <Text cardDescription marginL-5 marginR-5>
              •
            </Text>
            <Text cardDescription>
              {item.isAllDay
                ? 'All Day'
                : `${from.format('h:mma')} - ${end.format('h:mma')}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EventCard;
