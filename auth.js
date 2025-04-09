
// Firebase 연동 + 로그인 상태 관리
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Firebase 구성
const firebaseConfig = {
  apiKey: "AIzaSyByzEr81hS4o1fDAhLq2Jayaxs14qzAUdQ",
  authDomain: "jn-tutoring.firebaseapp.com",
  projectId: "jn-tutoring",
  storageBucket: "jn-tutoring.firebasestorage.app",
  messagingSenderId: "684996310822",
  appId: "1:684996310822:web:d764c0adfcfed09cbcf3e7",
  measurementId: "G-RJYDD02SE2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 승인된 이메일 리스트
const allowedEmails = ["qkrwjddus1234567@gmail.com"];

// 로그인 시도
window.handleGoogleLogin = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (!allowedEmails.includes(user.email)) {
        alert("존재하지 않는 아이디입니다.");
        signOut(auth);
        return;
      }
      localStorage.setItem("quiz_user", user.displayName);
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
    });
};

// 로그아웃
window.handleLogout = function () {
  signOut(auth).then(() => {
    localStorage.removeItem("quiz_user");
    window.location.href = "login.html";
  });
};
