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

async function agregarVehiculo(objetoVehiculo){
    const nuevoVehiculo = await firebase.firestore()
      .collection('vehiculo');
    await nuevoVehiculo.add(objetoVehiculo);
}

async function infoVehiculo(docVehiculo){
    const vehiculo = await firebase.firestore()
      .collection('vehiculo').doc(docVehiculo).get();
    return vehiculo;
}

export {
    listaParqueaderos,
    agregarVehiculo,
    infoParqueadero,
    infoVehiculo
}