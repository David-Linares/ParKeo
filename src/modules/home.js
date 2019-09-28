import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  Platform,
  PermissionsAndroid
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');
import { FlatList } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import { regionContainingPoints } from '../helpers/helpers';

const timeList = [{ id: 1, name: "Indefinido", isSelected: false }, { id: 2, name: "Fijo", isSelected: false },];
const vehicleTypeList = [{ id: 1, name: "1", isSelected: false }, { id: 2, name: "2", isSelected: false },];
const initialRegion = {
  latitude: 4.6589943,
  longitude: -74.1081384,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isAuthenticated: false,
      user: {
        email: 'pruebas@pruebas.com',
        password: '123456',
        '#ff5b00': '',
      },
      messageAuth: '',
      timeList,
      vehicleTypeList,
      region: {
        latitude: 4.6589943,
        longitude: -74.1081384,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: []
    };
  }

  onLogin = () => {
    const { email, password } = this.state.user;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user, messageAuth: 'Usuario autenticado correctamente' });
        console.log(user);
      })
      .catch(error => {
        this.setState({
          messageAuth:
            'Error en autenticación, lo sentimos tu usuario o contraseña no corresponden',
        });
      });
  };

  UNSAFE_componentWillMount() {
    this.getUserLocation();
  }

  getUserLocation() {
    try {
      Geolocation.getCurrentPosition(info => {
        console.log(info);

        this.setState({
          region: regionContainingPoints([
            {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            }
          ]),
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  onRegionChangeComplete = () => {
    console.log("Complete region");
    console.log(this.state.region);
  }



  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flex: 0.6 }}>
            <Text style={{ fontSize: 20, color: 'white' }}>PARKEO</Text>
          </View>
          <View style={{ flex: 1.4 }}>
            <View style={styles.viewSearch}>
              <TextInput
                style={styles.textinputSearch}
                onChangeText={text => this.setState({ search: text })}
                placeholder="Busca una ubicación"
                value={this.state.search}
              />
              <Image
                source={require('../assets/images/search.png')}
                style={styles.imageSearch}
              />
            </View>
          </View>
        </View>

        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={initialRegion}
          region={this.state.region}
          showsMyLocationButton={false}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {this.state.markers.map(marker => (
            <Marker
              keyExtractor={(item, key)=>{return key}}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <View style={styles.footer}>
          <View
            style={{
              height: 50,
              backgroundColor: '#ffbd71',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}>
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text>Tipo de vehiculo</Text>
              <FlatList
                horizontal={true}
                data={this.state.vehicleTypeList}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <Text>{item.name}</Text>}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Text>Tiempo</Text>
              <FlatList
                horizontal={true}
                data={this.state.timeList}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <Text>{item.name}</Text>}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'relative',
    zIndex: 0,
    flex: 1,
  },
  map: {
    width: '100%',
    height: '72%',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fd8f52',
    alignItems: 'center',
  },
  viewSearch: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  imageSearch: {
    position: 'absolute',
    width: 15,
    height: 15,
    top: 12.5,
    right: 15,
  },
  textinputSearch: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  footer: {
    height: '100%',
    backgroundColor: '#fd8f52',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
