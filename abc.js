// 最初にいくつか記事を入れておく
window.onload = function() {
    console.log("Linterds Blog 起動");
};

function addPost() {
    // 入力された値を取得
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (title === "" || content === "") {
        alert("タイトルと内容を入力してください！");
        return;
    }

    // 記事を表示するエリアを取得
    const postList = document.getElementById('post-list');

    // 新しい記事の箱（div）を作る
    const newPost = document.createElement('div');
    newPost.className = 'featured-post'; // CSSのスタイルを適用

    // 中身を組み立てる
    const now = new Date();
    const dateStr = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();

    newPost.innerHTML = `
        <span class="featured-label">New Post</span>
        <h2>${title}</h2>
        <p style="color: gray; font-size: 0.8em;">${dateStr}</p>
        <p>${content}</p>
    `;

    // リストの一番上に追加する
    postList.prepend(newPost);

    // 入力欄を空にする
    document.getElementById('postTitle').value = "";
    document.getElementById('postContent').value = "";
}

// 検索機能（前回の残り）
function searchArticle() {
    const query = document.getElementById('searchInput').value;
    alert(query + " を検索する機能は、次のアップデートで実装予定です！");
}