import React from 'react';
import { View, ActivityIndicator } from 'react-native';
//var Spinner = require('react-native-spinkit');
//import Spinner from 'react-native-spinkit';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
