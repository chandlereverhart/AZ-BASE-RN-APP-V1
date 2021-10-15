import React from 'react';

import {View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import styles from './styles';

const WorkOrderItemSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.skeletonContainer}>
        <SkeletonContent
          boneColor="#c2c2c2"
          containerStyle={styles.containerStyle}
          isLoading={true}
          layout={[
            {
              children: [
                {
                  height: 60,
                  width: 60,
                  borderRadius: 6,
                  marginRight: 12,
                },
              ],
            },
            {
              width: '80%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              children: [
                {
                  width: '70%',
                  height: 10,
                  borderRadius: 6,
                  marginBottom: 6,
                },
                {
                  width: '80%',
                  height: 10,
                  borderRadius: 6,
                  marginBottom: 6,
                },
                {
                  width: '40%',
                  height: 10,
                  borderRadius: 6,
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default WorkOrderItemSkeleton;
