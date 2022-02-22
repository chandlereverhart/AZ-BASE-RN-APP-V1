import React from 'react';
// COmponents
import {Image, TouchableWithoutFeedback} from 'react-native';
import {View, Text, Card} from 'react-native-ui-lib';
// Styles
import Stock2 from '../../../assets/images/stock2.jpg';
import _styles from './styles';

const DirectoryListItem = ({directory, item, index, onPress}) => {
  const styles = _styles();

  // function getImage() {
  //   if (item.photoUrl) {
  //     return {uri: item.photoUrl};
  //   }

  //   return Stock2;
  // }

  // console.log('LISTITEM', item);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <Card style={styles.directoryCard}>
          <View style={styles.container} padding-16>
            <Text style={[styles.itemCount, index < 3 && styles.itemCountTop]}>
              {index + 1}
            </Text>
            <View style={styles.borderRight}>
              <Text style={styles.departmentText}>{item.department} </Text>
            </View>

            <Text style={styles.nameText}>{item.name}</Text>
            {/* <Text style={styles.jobText}> {item.jobTitle} </Text> */}
            <View style={styles.imageContainer}>
              {/* <Image source={getImage()} style={styles.image} /> */}
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DirectoryListItem;
