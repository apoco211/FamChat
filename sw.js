
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: 'AIzaSyDKTiB6lqRDCHaM8vxWwbiX0K_nlb8_4jQ',
  authDomain: 'jeon-family-chat.firebaseapp.com',
  projectId: 'jeon-family-chat',
  storageBucket: 'jeon-family-chat.firebasestorage.app',
  messagingSenderId: '575056885546',
  appId: '1:575056885546:web:2fa1c64876773817906413',
  databaseURL: 'https://jeon-family-chat-default-rtdb.firebaseio.com'
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message ', payload);
  const title = payload.notification?.title || payload.data?.author || 'FamChat';
  const options = {
    body: payload.notification?.body || payload.data?.content || '새 메시지',
    icon: 'https://cdn-icons-png.flaticon.com/512/5962/5962463.png'
  };
  self.registration.showNotification(title, options);
});
