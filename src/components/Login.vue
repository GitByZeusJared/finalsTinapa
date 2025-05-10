<template>
  <div class="login-container">
    <h2 v-if="user">Welcome, {{ user.displayName }}</h2>

    <!-- Show the sign in, sign up, or login with Gmail based on the current state -->
    <div v-if="!user" class="auth-options">
      <!-- Card container for all options except Sign Up -->
      <div class="auth-card">
        <!-- Sign In Form -->
        <div v-if="!showSignUp" class="auth-form">
          <h3>Sign In</h3>
          <input v-model="email" type="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Password" required />
          <button @click="signIn" class="sign-in-btn">Sign In</button>
        </div>

        <!-- Google Sign In -->
        <button @click="loginWithGmail" class="google-sign-in-btn">
          <img src="Made by Google.jpg" alt="Google" class="google-icon" />
          <span>Sign In with Google</span>
        </button>
      </div>

      <!-- Toggle to show Sign Up or Sign In (outside the card) -->
      <button @click="showSignUp = !showSignUp" class="toggle-signup-btn">
        {{ showSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up' }}
      </button>

      <!-- Sign Up Form (Only shown when showSignUp is true) -->
      <div v-if="showSignUp" class="auth-form">
        <h3>Sign Up</h3>
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button @click="signUp" class="sign-up-btn">Sign Up</button>
      </div>
    </div>

    <!-- Logout Button -->
    <button v-if="user" @click="logout" class="logout-btn">Logout</button>
  </div>
</template>

<script>
import { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, registerDevice } from '../firebase';

export default {
  name: 'Login',
  data() {
    return {
      user: null,
      email: '',
      password: '',
      showSignUp: false,
    };
  },
  methods: {
    async loginWithGmail() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
        // Register the device in Firestore after login
        await registerDevice(this.user);
        this.$router.push('/home');
      } catch (error) {
        console.error('Login with Gmail error:', error);
      }
    },
    async signUp() {
      try {
        const result = await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.user = result.user;
        // Register the device in Firestore after sign-up
        await registerDevice(this.user);
        this.$router.push('/home');
      } catch (error) {
        console.error('Sign up error:', error);
      }
    },
    async signIn() {
      try {
        const result = await signInWithEmailAndPassword(auth, this.email, this.password);
        this.user = result.user;
        // Register the device in Firestore after sign-in
        await registerDevice(this.user);
        this.$router.push('/home');
      } catch (error) {
        console.error('Sign in error:', error);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
  created() {
    onAuthStateChanged(auth, (firebaseUser) => {
      this.user = firebaseUser;
      if (firebaseUser) {
        this.$router.push('/home');
      }
    });
  },
};
</script>

<style scoped>
/* Styling the login page */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(to bottom right, #e0f7fa, #ffffff);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h2, h3 {
  margin-bottom: 16px;
  color: #00796b;
}

.auth-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
}

.auth-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.sign-in-btn,
.sign-up-btn,
.google-sign-in-btn,
.logout-btn {
  background-color: #009688;
  color: white;
  padding: 10px 22px;
  margin: 10px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  width: 100%;
}

.sign-in-btn:hover,
.sign-up-btn:hover,
.google-sign-in-btn:hover,
.logout-btn:hover {
  background-color: #00796b;
}

input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 15px;
}

.toggle-signup-btn {
  background-color: transparent;
  color: #009688;
  text-decoration: underline;
  box-shadow: none;
  margin-top: 10px;
}

.google-sign-in-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  padding: 10px 20px;
}

.google-sign-in-btn:hover {
  background-color: #f5f5f5;
}

.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
