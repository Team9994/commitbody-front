importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBU5ETXhHKgFQ1WdT8rOoxfj0AG0KeJSzw',
  authDomain: 'commitbody-6773d.firebaseapp.com',
  projectId: 'commitbody-6773d',
  storageBucket: 'commitbody-6773d.firebasestorage.app',
  messagingSenderId: '261021331874',
  appId: '1:261021331874:web:ac7f61b5f77eec803f02fb',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload); // 메시지 수신 로그

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
