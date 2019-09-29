/* async UNSAFE_componentWillMount() {

    const documentSnapshot = await firebase.firestore()
      .collection('usuarios')
      .doc('L0swbgzJkcoQGEwiUhaT')
      .get();

    console.log('User data', documentSnapshot.data());

  } */

import firebase from 'react-native-firebase';

  /* HOME */

async function listaParqueaderos(){
    const lista = await firebase.firestore()
      .collection('Parqueadero').get();
    return lista
}

async function infoParqueadero(docParqueadero){
    const parqueadero = await firebase.firestore()
      .collection('Parqueadero').doc(docParqueadero).get();
    return parqueadero;
}

async function agregarParqueadero(objetoParqueadero){
    const nuevoParqueadero = await firebase.firestore()
      .collection('Parqueadero');
      await nuevoParqueadero.add(objetoParqueadero);
}

async function agregarVehiculo(objetoVehiculo){
    const nuevoVehiculo = await firebase.firestore()
      .collection('Vehiculo');
    await nuevoVehiculo.add(objetoVehiculo);
}

async function infoVehiculo(docVehiculo){
    const vehiculo = await firebase.firestore()
      .collection('Vehiculo').doc(docVehiculo).get();
    return vehiculo;
}

async function listaVehiculos(docPropietario){
    let vehiculosProp = [];
    const propietario = await firebase.firestore()
      .collection('Propietario').get(docPropietario);
    propietario._data.vehiculo.forEach(async element => {
        let vehiculo = await firebase.firestore()
          .collection('Vehiculo').doc(element).get();
        vehiculosProp.push(vehiculo);
    });
    return vehiculosProp;
}

async function listaReviews(){
    const reviews = await firebase.firestore()
      .collection('Reviews').get();
    return reviews;
}

export {
    listaParqueaderos,
    infoParqueadero,
    agregarParqueadero,
    listaVehiculos,
    infoVehiculo,
    agregarVehiculo,
    listaReviews
}