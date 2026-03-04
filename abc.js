// ページを開いた時に、データベースから記事を自動で取ってくる
window.onload = function() {
    const q = query(collection(window.db, "posts"), orderBy("createdAt", "desc"));
    
    // データベースが更新されるたびに、画面を自動で書き換える
    onSnapshot(q, (snapshot) => {
        const postList = document.getElementById('post-list');
        postList.innerHTML = ""; // 一旦クリア
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            const dateStr = data.createdAt ? data.createdAt.toDate().toLocaleDateString() : "投稿中...";
            
            const postElement = document.createElement('div');
            postElement.className = 'featured-post';
            postElement.innerHTML = `
                <span class="featured-label">Post</span>
                <h2>${data.title}</h2>
                <p style="color: gray; font-size: 0.8em;">${dateStr}</p>
                <p>${data.content}</p>
            `;
            postList.appendChild(postElement);
        });
    });
};

// 投稿ボタンを押した時の動き（Firebaseに保存する）
async function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (!title || !content) return alert("入力してね！");

    try {
        await addDoc(collection(window.db, "posts"), {
            title: title,
            content: content,
            createdAt: serverTimestamp()
        });
        
        // 入力欄を空にする
        document.getElementById('postTitle').value = "";
        document.getElementById('postContent').value = "";
    } catch (e) {
        console.error("エラー！: ", e);
    }
}