import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTo9QSKDWg_CJ0Cp-TPeLSSdUw8QsilXE", //
  authDomain: "linterds-blog.firebaseapp.com", //
  projectId: "linterds-blog", //
  storageBucket: "linterds-blog.firebasestorage.app", //
  messagingSenderId: "426467117578", //
  appId: "1:426467117578:web:da5f95f4617b82b8662df3", //
  measurementId: "G-4NWPV8E3XR" //
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ログイン状態を監視する
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ログインしているとき
    document.getElementById("welcome-msg").innerText = `ようこそ、${user.displayName} さん`;
    document.getElementById("user-info").innerHTML = `<span style="color: #4caf50;">ONLINE: ${user.displayName}</span>`;
  }
});

// ボタンクリックでログイン
document.getElementById("login-btn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Success");
    })
    .catch((error) => {
      alert("エラー: " + error.message);
    });
});