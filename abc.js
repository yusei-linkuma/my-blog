const ADMIN_KEY = "yusei-blog pass"; // 投稿時の合言葉
let allPosts = [];

window.onload = function() {
    const q = query(collection(window.db, "posts"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderPosts(allPosts);
    });
};

function renderPosts(posts) {
    const list = document.getElementById('post-list');
    list.innerHTML = "";
    posts.forEach(data => {
        const date = data.createdAt ? data.createdAt.toDate().toLocaleString() : "...";
        const div = document.createElement('div');
        div.className = 'featured-post';
        div.innerHTML = `
            <div class="post-meta">[${data.category.toUpperCase()}] | ${date}</div>
            <h3 style="margin:5px 0; color:var(--main-blue)">> ${data.title}</h3>
            <p style="white-space:pre-wrap; margin:0; opacity:0.8">${data.content}</p>
        `;
        list.appendChild(div);
    });
}

function searchLogs() {
    const word = document.getElementById('searchInput').value.toLowerCase();
    renderPosts(allPosts.filter(p => p.title.toLowerCase().includes(word) || p.content.toLowerCase().includes(word)));
}

function filterCategory(cat) {
    renderPosts(cat === 'all' ? allPosts : allPosts.filter(p => p.category === cat));
}

async function addPost() {
    if (prompt("ENTER ACCESS KEY:") !== ADMIN_KEY) return alert("DENIED");
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const category = document.getElementById('postCategory').value;

    if (!title || !content) return alert("EMPTY ERROR");

    await addDoc(collection(window.db, "posts"), { title, content, category, createdAt: serverTimestamp() });
    document.getElementById('postTitle').value = "";
    document.getElementById('postContent').value = "";
}