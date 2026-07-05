import { useState } from "react";

function App() {
  const [page, setPage] = useState(0);

  if (page === 1) {
    return (
      <div>
        <button onClick={() => setPage(0)}>回首頁</button>

        <h1>客人資料</h1>

        <p>姓名</p>
        <input placeholder="輸入客人姓名" />

        <p>膚色</p>
        <input placeholder="例如：白皙、自然、小麥" />

        <p>備註</p>
        <textarea placeholder="例如：敏感肌、容易出油"></textarea>

        <br />
        <br />

        <button onClick={() => alert("客人資料已儲存")}>
          儲存
        </button>
      </div>
    );
  }if (page === 2) {
    return (
      <div>
        <button onClick={() => setPage(0)}>回首頁</button>
        <h1>新增工作紀錄</h1>
        <p>這裡之後會填通告內容、服裝照片、使用產品。</p>
      </div>
    );
  }

  if (page === 3) {
    return (
      <div>
        <button onClick={() => setPage(0)}>回首頁</button>
        <h1>化妝品資料庫</h1>
        <p>這裡之後會放品牌、品名、色號、分類。</p>
      </div>
    );
  }if (page === 4) {
    return (
      <div>
        <button onClick={() => setPage(0)}>回首頁</button>
        <h1>我的化妝箱</h1>
        <p>這裡之後會放你目前擁有的化妝品清單。</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Makeup Manager</h1>
      <h2>歡迎回來，妙妙！</h2>

      <button onClick={() => setPage(1)}>
        客人資料
      </button>

      <br />
      <br />

      <button onClick={() => setPage(2)}>
        新增工作紀錄
      </button>

      <br />
      <br />

      <button onClick={() => setPage(3)}>
        化妝品資料庫
      </button>

      <br />
      <br />

      <button onClick={() => setPage(4)}>
        我的化妝箱
      </button>
    </div>
  );
}

export default App;