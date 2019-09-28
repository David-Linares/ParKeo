
import React from 'react'
import { View, Text, Button } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'react-native-firebase';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.state.messageAuth}</Text>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
}, {
  initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator)