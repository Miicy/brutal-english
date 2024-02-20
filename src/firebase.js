import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCXeGnlNun-hpLYr5fG-xKONrHpdqy5dbg",
	authDomain: "brutaltreningsuplementi-751ee.firebaseapp.com",
	projectId: "brutaltreningsuplementi-751ee",
	storageBucket: "brutaltreningsuplementi-751ee.appspot.com",
	messagingSenderId: "642743449480",
	appId: "1:642743449480:web:ae0de7c4766312559a6c3d",
};

const app = initializeApp(firebaseConfig);
export const STORAGE = getStorage(app);
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');
