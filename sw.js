// FamChat Firebase Messaging Service Worker - v1.3.16
// GitHub Pages root에 있어야 함

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDKTiB6lqRDCHaM8vxWwbiX0K_nlb8_4jQ',
  authDomain: 'jeon-family-chat.firebaseapp.com',
  projectId: 'jeon-family-chat',
  storageBucket: 'jeon-family-chat.firebasestorage.app',
  messagingSenderId: '575056885546',
  appId: '1:575056885546:web:2fa1c64876773817906413',
  databaseURL: 'https://jeon-family-chat-default-rtdb.firebaseio.com'
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background 메시지 수신 - 아이폰에서 다른 앱 사용 중에도 이게 울림
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message', payload);
  const title = payload.notification?.title || payload.data?.author || '전씨네 Family Chat';
  const body = payload.notification?.body || payload.data?.content || '새 메시지 도착';
  
  const notificationOptions = {
    body: body,
    icon: 'https://cdn-icons-png.flaticon.com/512/5962/5962463.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/5962/5962463.png',
    vibrate: [200, 100, 200],
    data: payload.data,
    requireInteraction: false,
    tag: 'famchat-message'
  };

  return self.registration.showNotification(title, notificationOptions);
});

// Notification 클릭 시 앱 열기
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true}).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes('FamChat') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
