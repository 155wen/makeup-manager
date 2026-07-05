function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>💄 Makeup Manager</h1>

      <h3>歡迎回來，妙妙！</h3>

      <hr />

      <p>今天想做什麼？</p>

      <button onClick={() => alert("客人資料功能開發中 😊")}>
        👩 客人資料
      </button>

      <br />
      <br />

      <button onClick={() => alert("新增工作紀錄功能開發中 😊")}>
        📝 新增工作紀錄
      </button>

      <br />
      <br />

      <button onClick={() => alert("化妝品資料庫功能開發中 😊")}>
        💄 化妝品資料庫
      </button>

      <br />
      <br />

      <button onClick={() => alert("我的化妝箱功能開發中 😊")}>
        🧰 我的化妝箱
      </button>
    </div>
  );
}

export default App;
