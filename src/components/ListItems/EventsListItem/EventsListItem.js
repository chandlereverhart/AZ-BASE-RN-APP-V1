import React from 'react';
// COmponents
import {Image, TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import dayjs from 'dayjs';
// Styles
import Stock2 from '../../../assets/images/stock2.jpg';
import styles from './styles';

const EventsListItem = ({event, onPress}) => {
  const date = dayjs(new Date(event.date.seconds * 1000));
  const startTime = dayjs(new Date(event.startTime.seconds * 1000));
  const endTime = dayjs(new Date(event.endTime.seconds * 1000));

  function getImage() {
    if (event.fileUrl) {
      return {uri: event.fileUrl};
    }

    return Stock2;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <View style={styles.date} marginR-16>
          <Text h1Medium>{date.format('DD')}</Text>
          <Text body>{date.format('MMM')}</Text>
        </View>
        <Image source={getImage()} style={styles.image} />
        <View style={styles.container} padding-16>
          <Text titleMedium>{event.title}</Text>
          <Text nobel body>
            {event.isAllDay
              ? 'All Day Event'
              : `${startTime.format('h:mma')} - ${endTime.format('h:mma')}`}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EventsListItem;
