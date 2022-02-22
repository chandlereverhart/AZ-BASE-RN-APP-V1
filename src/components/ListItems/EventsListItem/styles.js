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
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'white',
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
