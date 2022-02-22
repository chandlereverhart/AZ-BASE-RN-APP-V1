import React from 'react';
// Components
import {TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import MapView from 'react-native-maps';
import Icon from '../../Icon';
// Styles
import _styles from './styles';

const SpecialsListItem = ({onPress, item}) => {
  const styles = _styles();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <MapView
          style={styles.map}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          legalLabelInsets={{bottom: -100}}
          region={{
            latitude: item?.lat,
            longitude: item?.lng,
            latitudeDelta: 0.0922, // Height
            longitudeDelta: 0.0421, // Width
          }}
        />
        <View style={styles.content}>
          <View style={styles.textTop}>
            <Text bodyBold>{item.name}</Text>
          </View>
          <Text style={styles.formattedLocation}>{item.streetAddress}</Text>

          <View>
            <Text style={styles.textBottom} nobel>
              Location Details
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
