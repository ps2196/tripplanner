import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBNjsleFown9YIg-H1skZVhgLPnrwbdlYo',
  authDomain: 'tripplanner-70e66.firebaseapp.com',
  databaseURL: 'https://tripplanner-70e66.firebaseio.com',
  projectId: 'tripplanner-70e66',
  storageBucket: 'tripplanner-70e66.appspot.com',
  messagingSenderId: '188036682146',
  appId: '1:188036682146:android:33acde6d5d94583b11e2fb',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();

export const getUserData = (uid) => {
  return db.collection('users').doc(uid).get().then(documentSnapshot => {
    if (documentSnapshot.exists) {
        return documentSnapshot.data();
    }
    else{
      return null;
    }
});
};

export const findUserByEmail = (email) => {
  return db.collection('users').where('email', '==', email).get().then((querySnapshot) => {
    const uids = [];
    querySnapshot.forEach( (ds) => {
      uids.push(ds.id)
    });
    return uids;
  },
  () => {return []});
};

export const getTripsForUser = (uid) => {
  return db.collection('trips').where('participants', 'array-contains', uid).get().then((querySnapshot) => {
    const trips = [];
    querySnapshot.forEach( (ds) => {
      trips.push({id: ds.id, ...ds.data()})
    });
    return trips;
  },
  () => {return []});
}

export const getTripDetails = (tripId) => {
  return db.collection('trips').doc(tripId).get().then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      return documentSnapshot.data();
    }
    else{
      return null;
    }
  },
  () => {return null});
}


export { firebase };
