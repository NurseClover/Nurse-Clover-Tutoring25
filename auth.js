// ✅ Firebase 설정
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// 🔐 Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyByzEr81hS4o1fDAhLq2Jayaxs14qzAUdQ",
  authDomain: "jn-tutoring.firebaseapp.com",
  projectId: "jn-tutoring",
  storageBucket: "jn-tutoring.appspot.com",
  messagingSenderId: "684996310822",
  appId: "1:684996310822:web:d764c0adfcfed09cbcf3e7",
  measurementId: "G-RJYDD02SE2"
};

// 🚀 Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ☑️ 승인된 사용자 이메일만 허용
const allowedEmails = ["qkrwjddus1234567@gmail.com"]; // 추가 가능

document.getElementById("googleLogin").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const email = user.email;
      if (allowedEmails.includes(email)) {
        localStorage.setItem("quiz_user", user.displayName);
        alert(`${user.displayName}님, 환영합니다!`);
        location.href = "home.html";
      } else {
        alert("존재하지 않는 아이디입니다.");
      }
    })
    .catch((error) => {
      console.error("로그인 오류", error);
      alert("로그인 중 오류가 발생했습니다.");
    });
});
