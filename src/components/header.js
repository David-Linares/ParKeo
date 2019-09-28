import React, {PureComponent, Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.header}>
        <Text style={{color: 'white', fontSize: 18}}>PARKEO</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fd8f52',
    alignItems: 'center',
  },
});

export default Header;
