import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9T7PcBjfVIQdH2GySAVFEN4RseUdW4A4",
    authDomain: "finalblog-a9448.firebaseapp.com",
    projectId: "finalblog-a9448",
    storageBucket: "finalblog-a9448.appspot.com",
    messagingSenderId: "525325477600",
    appId: "1:525325477600:web:244494980ad120e2231285"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('Firebase initialized');

const blogSection = document.querySelector('.blogs-section');

const blogsRef = collection(db, "blogs");

getDocs(blogsRef).then((blogsSnapshot) => {
    blogsSnapshot.forEach(blogDoc => {
        if (blogDoc.id !== decodeURI(location.pathname.split("/").pop())) {
            createBlog(blogDoc);
        }
    });
});

const createBlog = (blogDoc) => {
    let data = blogDoc.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blogDoc.id}" class="btn dark">read</a>
    </div>
    `;
}
