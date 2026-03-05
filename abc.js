// --- Linterds OS 設定エリア ---
// あなただけの合言葉（好きな言葉に変えてね！）
const ADMIN_ACCESS_KEY = "Yusei0918-toukou"; 

// ページ読み込み時の処理
window.onload = function() {
    console.log("Linterds OS Initializing Neural Link...");

    // リアルタイムデータベースリスナーの設定
    const q = query(collection(window.db, "posts"), orderBy("createdAt", "desc"));
    
    onSnapshot(q, (snapshot) => {
        const postList = document.getElementById('post-list');
        postList.innerHTML = ""; // 一旦クリア

        snapshot.forEach((doc) => {
            const data = doc.data();
            // 日付のフォーマット
            const dateStr = data.createdAt ? data.createdAt.toDate().toLocaleString('ja-JP') : "Syncing...";
            
            // 記事のエレメントを作成（モダンデザイン）
            const postElement = document.createElement('div');
            postElement.className = 'featured-post';
            postElement.innerHTML = `
                <div class="post-meta">Log_ID: ${doc.id} | Timestamp: ${dateStr}</div>
                <h3 class="post-title">${data.title}</h3>
                <p class="post-content">${data.content}</p>
            `;
            postList.appendChild(postElement);
        });
        console.log("Linterds OS: Data grid synchronized.");
    });
};

// 投稿関数（合言葉認証付き）
async function addPost() {
    // 1. 合言葉の入力（プロンプト）
    const inputKey = prompt("ENTER ADMIN ACCESS KEY:");
    
    // 2. 認証チェック
    if (inputKey !== ADMIN_ACCESS_KEY) {
        alert("ACCESS DENIED: Unauthorized Key.");
        return; // 投稿を中止
    }

    // 認証成功後の処理
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (!title || !content) {
        alert("ERROR: System requires both Title and Content.");
        return;
    }

    try {
        console.log("Linterds OS: Publishing to core grid...");
        // Firebaseにデータを追加
        await addDoc(collection(window.db, "posts"), {
            title: title,
            content: content,
            createdAt: serverTimestamp() // サーバー時間を保存
        });
        
        // 入力欄をクリア
        document.getElementById('postTitle').value = "";
        document.getElementById('postContent').value = "";
        alert("SUCCESS: Log published to Linterds Archive.");
        
    } catch (e) {
        console.error("CRITICAL ERROR during publish: ", e);
        alert("SYSTEM ERROR: Failed to publish log.");
    }
}