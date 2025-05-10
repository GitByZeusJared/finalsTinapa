import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyBlagWot02c8JxVZbQi2LoG-bmEXmRR1qY",
  authDomain: "tnpfinals.firebaseapp.com",
  projectId: "tnpfinals",
  storageBucket: "tnpfinals.firebasestorage.app",
  messagingSenderId: "403158358763",
  appId: "1:403158358763:web:c76cf2391513917f643cae",
  measurementId: "G-Z74BZGVVM8"
};

const app = initializeApp(firebaseConfig);

// Firebase authentication and provider setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Function to detect device type based on user agent
const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('mobile')) {
    return 'Phone';
  } else if (userAgent.includes('tablet')) {
    return 'Tablet';
  } else if (userAgent.includes('laptop') || userAgent.includes('macintosh') || userAgent.includes('windows')) {
    return 'Laptop/PC';
  } else {
    return 'Unknown'; // Default value for unknown devices
  }
};

// Register Device in Firestore
const registerDevice = async (user) => {
  try {
    const deviceType = getDeviceType(); // Get the device type (Phone, Laptop, Tablet)
    const deviceRef = doc(db, 'Devices', user.uid); // Use user.uid as the document ID
    
    // Register the device in Firestore with the UID as the document ID
    await setDoc(deviceRef, {
      deviceTypes: [deviceType], // Store device type(s) as an array
      registeredAt: Timestamp.now(), // Store timestamp of registration
      userID: user.uid // Store the user ID
    });

    console.log('Device registered successfully');
  } catch (error) {
    console.error('Error registering device:', error);
  }
};

// Export functions for authentication
export { auth, provider, signInWithPopup, signOut, onAuthStateChanged, registerDevice };
