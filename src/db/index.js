import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB0gMeHxaBOf0HNdqM0xOP_i3Q36ZRKnH0',
  authDomain: 'exchangario-b45b0.firebaseapp.com',
  projectId: 'exchangario-b45b0',
  storageBucket: 'exchangario-b45b0.appspot.com',
  messagingSenderId: '949139715420',
  appId: '1:949139715420:web:517c961609379489ab7d99',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
