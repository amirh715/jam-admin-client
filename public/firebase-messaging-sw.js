importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

import { getToken, onMessage } from 'firebase/messaging';

const fcmConfig = {
  apiKey: 'AIzaSyC39bXdJAlAjLapfKqL3nrKPNzUXkg95xs',
  authDomain: 'jamusic-5fd24.firebaseapp.com',
  projectId: 'jamusic-5fd24',
  storageBucket: 'jamusic-5fd24.appspot.com',
  messagingSenderId: '603123320217',
  appId: '1:603123320217:web:949f1cf984ed253ff53f08',
  measurementId: 'G-8QJSDQDV4R',
};

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp(fcmConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

getToken(messaging, { vapidKey: 'BORT7Rl_GFJE-IaNyl8nih6FRmRMQUHijKUpbNy1kIkAm1E4khGtobXs4gPhCZarcpThVsaJ9rtOkQfZymc67g0' })
.then((token) => {
  console.log(token);
})
.catch((err) => {
  console.log(err);
});

onMessage(messaging, (payload) => {
  console.log(payload);
  alert('HEELLLELELELE');
});

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});