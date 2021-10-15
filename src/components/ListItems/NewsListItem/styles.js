import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOpacity: 2,
    shadowRadius: 2,
    paddingHorizontal: 12,
    marginBottom: 2,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  content: {
    marginLeft: 12,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 24,
  },
});

export default styles;
