import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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

let blogId = decodeURI(location.pathname.split("/").pop());

const docRef = doc(db, "blogs", blogId);

getDoc(docRef).then((docSnapshot) => {
    if (docSnapshot.exists()) {
        setupBlog(docSnapshot.data());
    } else {
        location.replace("/");
    }
});

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);

    data.forEach(item => {
        // check for heading
        if (item[0] == '#') {
            let hCount = 0;
            let i = 0;
            while (item[i] == '#') {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        }
        //checking for image format
        else if (item[0] == "!" && item[1] == "[") {
            let separator;

            for (let i = 0; i <= item.length; i++) {
                if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
                    separator = i;
                }
            }

            let alt = item.slice(2, separator);
            let src = item.slice(separator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    });
}
