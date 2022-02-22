import React from 'react';
// COmponents
import {Image, TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import dayjs from 'dayjs';
// Styles
import Stock1 from '../../../assets/images/stock1.jpg';
import styles from './styles';

const VideosListItem = ({video, onPress}) => {
  const date = dayjs(new Date(video.date));

  function getImage() {
    if (video.thumbnail) {
      return {uri: video.thumbnail};
    }

    return Stock1;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <View style={styles.date} marginR-16 marginL-16>
          <Text h1Medium>{date.format('DD')}</Text>
          <Text body>{date.format('MMM')}</Text>
        </View>
        <Image source={getImage()} style={styles.image} />
        <View style={styles.container} padding-16>
          <Text titleMedium>{video.title}</Text>
          <Text style={styles.previewParagraph} numberOfLines={2}>
            {video.description.replace(/<[^>]+>/g, '')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideosListItem;
