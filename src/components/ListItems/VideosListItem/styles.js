import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  previewParagraph: {
    fontSize: 14,
    opacity: 0.7,
  },
});

export default styles;
