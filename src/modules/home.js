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
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';
import Geolocation from '@react-native-community/geolocation';
import { regionContainingPoints } from '../helpers/helpers';
import { FlatList } from 'react-native-gesture-handler';

const initialRegion = {
  latitude: 4.6589943,
  longitude: -74.1081384,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const { width, height } = Dimensions.get('window');
import {
  listaParqueaderos,
  agregarVehiculo,
  infoParqueadero,
  infoVehiculo,
  listaVehiculos,
  listaReviews
} from '../services/services';

const timeList = [
  { id: 1, name: 'Indefinido', isSelected: false },
  { id: 2, name: 'Fijo', isSelected: false },
];
const vehicleTypeList = [
  { id: 1, name: '1', isSelected: false },
  { id: 2, name: '2', isSelected: false },
];

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
      markers: [],
      parkingSelected: null,
      parqueaderos: [],
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
    listaParqueaderos()
      .then(result => {
        this.setState({ parqueaderos: result._docs })
        console.log(result._docs);
      }).catch(err => console.log('Error en listaParqueaderos', err));
    infoParqueadero('xoMWRE8zOtaRIFoHfyAK')
      .then(result => console.log('infoParqueadero', result))
      .catch(err => console.log('Error en infoParqueadero', err));
    infoVehiculo('dQnWzbWQNv6CPCJe9jAA')
      .then(result => console.log('infoVehiculo', result))
      .catch(err => console.log('Error en infoVehiculo', err));
    listaVehiculos('oVGL7kI6ALTgGPClH42z')
      .then(result => console.log( 'listaVehiculos', result ))
      .catch(err => console.log('Error en listaVehiculos', err) )
    this.getUserLocation();
  }

  selectParking = (parking) => {
    this.setState({ parkingSelected: parking })

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
              keyExtractor={(item, key) => { return key }}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
          {this.state.parqueaderos.map(parqueadero => (
            <Marker
              keyExtractor={(item, key) => { return key }}
              coordinate={{ longitude: parqueadero._data.ubicacion._longitude, latitude: parqueadero._data.ubicacion._latitude }}
              onPress={() => this.selectParking(parqueadero)}
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
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
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
                alignItems: 'center',
              }}>
              <Text>Tiempo</Text>
              <FlatList
                horizontal={true}
                data={this.state.timeList}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => this.renderItemTime(item)}
              />
            </View>
          </View>
          {this.getParkingSelected()}
        </View>
      </SafeAreaView>
    );
  }

  renderItemTime(item) {
    const isSelected = item.isSelected;
    return (
      <TouchableOpacity
        onPress={() => this.onPressSelectedTime(item)}
        style={[isSelected ? { backgroundColor: '#fd8f52' } : {}]}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  onPressSelectedTime = itemSelected => {
    let timeList = this.state.timeList;
    timeList = timeList.map((item, index) => {
      item.isSelected = item.id == itemSelected.id;
      return item;
    });

    this.setState({ timeList });
  };

  getParkingSelected() {
    let parkingSelected = this.state.parkingSelected;
    if (parkingSelected == null) {
      return null;
    }
    parkingSelected = parkingSelected._data;
    console.log(parkingSelected);
    return (
      <View
        style={{
          height: 200,
          backgroundColor: 'white',
          paddingHorizontal: 70,
          paddingVertical: 40,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 0.8 }}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../assets/images/onboarding2.png')}
            />
          </View>
          <View style={{ flex: 1.2 }}>
            <View style={{ backgroundColor: 'white' }}>
              <Text style={{ fontSize: 13 }}>Calle 22 # 1132131</Text>
              <Text style={{ fontSize: 13 }}> { parkingSelected.horario }</Text>
              <Text style={{ fontSize: 13 }}> { parkingSelected.precio } cop/min </Text>
              <Text style={{ fontSize: 13 }}>Reserva inmediata</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
        onPress={()=>this.onPressReservateParking(parkingSelected)}
          style={{
            height: 40,
            marginTop: 20,
            backgroundColor: '#fd8f52',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={{ fontSize: 14, color: 'white' }}>Reservar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onPressReservateParking=(parkingSelected)=>{
    this.props.navigation.navigate("Reservate", parkingSelected );

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
    height: '100%',
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
    width: '100%',
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#fd8f52',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
