function Home({ setPage }) {
  return (
    <div>
      <h1>💄 Makeup Manager</h1>
      <h3>歡迎回來，妙妙！</h3>

      <hr />

      <button onClick={() => setPage("clients")}>客人管理</button>
      <br /><br />

      <button onClick={() => setPage("products")}>化妝品資料庫</button>
      <br /><br />

      <button onClick={() => setPage("jobs")}>工作紀錄</button>
    </div>
  );
}

export default Home;