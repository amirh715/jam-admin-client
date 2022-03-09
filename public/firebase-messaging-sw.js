importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyC39bXdJAlAjLapfKqL3nrKPNzUXkg95xs',
  authDomain: 'jamusic-5fd24.firebaseapp.com',
  projectId: 'jamusic-5fd24',
  storageBucket: 'jamusic-5fd24.appspot.com',
  messagingSenderId: '603123320217',
  appId: '1:603123320217:web:949f1cf984ed253ff53f08',
  measurementId: 'G-8QJSDQDV4R',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };
    
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
