import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import Header from './../components/header';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
class Reservate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: ""
    };
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        this.onSwipeRight();
        break;
      case SWIPE_RIGHT:
        this.onSwipeRight();
        break;
    }
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS == "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    }
  }

  onSwipeRight() {
    this.props.navigation.replace("Home");
  }

  handleBackButton() {
    this.props.navigation.replace("Home");
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 100
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor
          }}
        >
          <Header></Header>
          <View
            style={{
              height: 150,
            }}>
            <ImageBackground
              source={require('../assets/images/parking.jpg')}
              style={{
                height: 120,
                paddingHorizontal: 50,
                backgroundColor: '#15d2bb',
              }}
            />
            <Image
              source={require('../assets/images/profile.jpg')}
              style={{
                width: 60,
                height: 60,
                position: 'absolute',
                left: 30,
                bottom: 0,
                borderRadius: 30,
                backgroundColor: 'blue',
              }}
            />
            <Text
              style={{
                position: 'absolute',
                bottom: 35,
                left: 100,
                color: 'white',
                fontSize: 15,
              }}>
              Vas a parkear con{' '}
              <Text style={{ color: '#fd8f52' }}>Carlos Arango</Text>
            </Text>
            <Text style={{ position: 'absolute', bottom: 10, left: 100 }}>
              Calle 22 d # 49-20
          </Text>
          </View>
          <View style={{ marginHorizontal: 40 }}>
            <View style={styles.card}>
              <Text>Tiempo</Text>
              {this.getInfoTime('Fecha', '2018-9-10')}
              {this.getInfoTime('Hora llegada', '9:00 am ')}
              {this.getInfoTime('Hora fin', '14:00 pm')}
              <Text style={{ marginTop: 10, }}>Vehiculo</Text>
              <Text style={{ marginTop: 10, }}>Método de pago</Text>
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                marginTop: 20,
                backgroundColor: '#fd8f52',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{ fontSize: 18, color: 'white' }}>Reservar</Text>
            </TouchableOpacity>
          </View>
        </GestureRecognizer>
      </SafeAreaView>
    );
  }

  getInfoParkingItem(name, icon, value) { }

  getInfoTime(title, value) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          marginHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1 }}>
          <Text>{title}</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            flex: 1,
            borderColor: '#fd8f52',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fd8f52' }}>{value}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: '65%',
    padding: 20,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    marginTop: 40,
    shadowColor: 'black',
    elevation: 0,
    shadowOffset: { height: 0, width: 0 },
    borderWidth: 0.5,
    borderRadius: 10,
  },
});

export default Reservate;
