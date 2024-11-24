// Firebase 설정 파일
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

export const getFCMToken = async () => {
  try {
    if (typeof window === 'undefined') {
      console.log('브라우저 환경이 아닙니다');
      return '';
    }

    // 알림 권한 확인 및 요청
    const permission = await Notification.requestPermission();
    console.log('알림 권한 상태:', permission);

    if (permission !== 'granted') {
      console.log('알림 권한이 거부됨');
      return '';
    }

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error('FCM 토큰 발급 중 오류:', error);
    return '';
  }
};
