import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider();



export {
    db,
    googleAuthProvider,
    auth,
}