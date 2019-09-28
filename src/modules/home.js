import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window')
export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {
        email: 'pruebas@pruebas.com',
        password: '123456'
      },
      messageAuth: ""
    };
  }

  onLogin = () => {
    const { email, password } = this.state.user;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ user, messageAuth: "Usuario autenticado correctamente" });
        console.log(user);
      })
      .catch((error) => {
        this.setState({
          messageAuth: "Error en autenticación, lo sentimos tu usuario o contraseña no corresponden"
        })
      });
  }



  UNSAFE_componentWillMount() {

    this.onLogin();

  }

  /* async UNSAFE_componentWillMount() {

    const documentSnapshot = await firebase.firestore()
      .collection('usuarios')
      .doc('L0swbgzJkcoQGEwiUhaT')
      .get();

    console.log('User data', documentSnapshot.data());

  } */

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'relative',
    zIndex: 0,
    flex: this.statusBarHeight
  },
  map: {
    width: '100%',
    height: '100%'
  }
})
