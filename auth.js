// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Firebase 설정 (당신의 프로젝트 정보로 세팅)
const firebaseConfig = {
  apiKey: "AIzaSyByzEr81hS4o1fDAhLq2Jayaxs14qzAUdQ",
  authDomain: "jn-tutoring.firebaseapp.com",
  projectId: "jn-tutoring",
  storageBucket: "jn-tutoring.appspot.com",
  messagingSenderId: "684996310822",
  appId: "1:684996310822:web:d764c0adfcfed09cbcf3e7",
  measurementId: "G-RJYDD02SE2"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 로그인 버튼 이벤트 연결
document.getElementById("googleLogin").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const email = result.user.email;
      const name = result.user.displayName || "사용자";

      // 승인된 이메일만 통과
      const allowed = ["qkrwjddus1322@naver.com"];
      if (!allowed.includes(email)) {
        alert("존재하지 않는 아이디입니다.");
        return;
      }

      localStorage.setItem("quiz_user", name);
      location.href = "home.html";
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 콘솔을 확인하세요.");
    });
});
