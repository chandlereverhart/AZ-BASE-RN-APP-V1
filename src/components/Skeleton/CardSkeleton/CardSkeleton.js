import React from 'react';

import {View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import styles from './styles';

const EventsListItem = ({height = 200, width = 200}) => {
  return (
    <View style={styles.container}>
      <SkeletonContent
        boneColor="#c2c2c2"
        containerStyle={styles.root}
        isLoading={true}
        layout={[
          {
            marginLeft: 16,
            width: '100%',
            flexDirection: 'column',
            children: [
              {
                width,
                height,
                borderRadius: 4,
                marginBottom: 10,
              },
              {
                width: '60%',
                height: 20,
                borderRadius: 4,
              },
            ],
          },
        ]}
      />
      {/* <SkeletonContent
        boneColor="#c2c2c2"
        containerStyle={styles.secondary}
        isLoading={true}
        layout={[
          {
            width: 150,
            height: 25,
          },
        ]}
      /> */}
    </View>
  );
};

export default EventsListItem;
