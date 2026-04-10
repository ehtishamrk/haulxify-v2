// Firebase initialization — loaded before main.js on every page
(function() {
  var s1 = document.createElement('script');
  s1.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
  s1.onload = function() {
    var s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js';
    s2.onload = function() {
      firebase.initializeApp({
        apiKey: "AIzaSyBaRMQBLfDyufJkC4E8XCvzOIMEawOQObw",
        authDomain: "haulxify-app.firebaseapp.com",
        projectId: "haulxify-app",
        storageBucket: "haulxify-app.firebasestorage.app",
        messagingSenderId: "453228026261",
        appId: "1:453228026261:web:1d66ab1d47418906807e9c"
      });
      window.__firebaseReady = true;
      document.dispatchEvent(new Event('firebaseReady'));
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
})();
