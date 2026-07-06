import { useState } from "react";

function App() {
  const [page, setPage] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [clientSearch, setClientSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState({});

  const products = [
    { name: "NARS 粉底 Oslo", category: "粉底" },
    { name: "MAC 粉底 NC20", category: "粉底" },
    { name: "Dior 遮瑕 2N", category: "遮瑕" },
    { name: "Chanel 粉餅 10", category: "粉餅" },
    { name: "3CE 腮紅", category: "腮紅" },
    { name: "Clio 眼影盤", category: "眼影" },
    { name: "妝前保濕精華", category: "保養品" },
    { name: "保濕妝前乳", category: "保養品" }
  ];

  const clients = ["林小姐", "王小姐", "小安", "琪琪"];

  const jobs = [
    { id: 1, date: "2026/07/06", client: "林小姐", notice: "節目錄影" },
    { id: 2, date: "2026/07/06", client: "王小姐", notice: "平面拍攝" }
  ];

  const categories = ["粉底", "遮瑕", "粉餅", "腮紅", "眼影", "保養品"];

  const [jobStatus, setJobStatus] = useState({
    1: "進行中",
    2: "未開始"
  });

  const [bagByDate, setBagByDate] = useState({
    "2026/07/06": ["MAC 粉底 NC20", "Dior 遮瑕 2N", "3CE 腮紅"]
  });

  const [usedByJob, setUsedByJob] = useState({
    1: ["MAC 粉底 NC20"],
    2: ["Dior 遮瑕 2N"]
  });

  function toggleBag(date, productName) {
    const currentBag = bagByDate[date] || [];

    if (currentBag.includes(productName)) {
      setBagByDate({
        ...bagByDate,
        [date]: currentBag.filter((item) => item !== productName)
      });
    } else {
      setBagByDate({
        ...bagByDate,
        [date]: [...currentBag, productName]
      });
    }
  }

  function toggleUsed(jobId, productName) {
    const currentUsed = usedByJob[jobId] || [];

    if (currentUsed.includes(productName)) {
      setUsedByJob({
        ...usedByJob,
        [jobId]: currentUsed.filter((item) => item !== productName)
      });
    } else {
      setUsedByJob({
        ...usedByJob,
        [jobId]: [...currentUsed, productName]
      });
    }
  }

  if (page === 1) {
    const filteredClients = clients.filter((client) =>
      client.includes(clientSearch)
    );

    return (
      <div>
        <button onClick={() => setPage(0)}>回首頁</button>
        <h1>客人管理</h1>

        <input
          placeholder="搜尋客人"
          value={clientSearch}
          onChange={(event) => setClientSearch(event.target.value)}
        />

        <hr />

        {filteredClients.map((client) => {
          const clientJobs = jobs.filter((job) => job.client === client);

          return (
            <div key={client}>
              <h2>{client}</h2>
              <h3>歷史使用產品</h3>

              {clientJobs.length === 0 && <p>目前沒有工作紀錄</p>}

              {clientJobs.map((job) => (
                <div key={job.id}>
                  <p>{job.date}</p>
                  <p>實際使用：{(usedByJob[job.id] || []).join("、")}</p>
                </div>
              ))}

              <hr />
            </div>
          );
        })}
      </div>
    );
  }

  if (page === 2) {
    return (
      <div>
        <button onClick={() => setPage(0)}>回首頁</button>
        <h1>化妝品資料庫</h1>

        {categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            {products
              .filter((product) => product.category === category)
              .map((product, index) => (
                <p key={index}>💄 {product.name}</p>
              ))}
          </div>
        ))}
      </div>
    );
  }

  if (page === 3) {
    return (
      <div>
        <button onClick={() => setPage(0)}>回首頁</button>
        <h1>工作紀錄</h1>

        <button onClick={() => setPage(6)}>＋ 新增工作流程</button>

        <hr />

        {jobs.map((job) => (
          <p key={job.id}>
            <button
              onClick={() => {
                setSelectedJob(job);
                setPage(4);
              }}
            >
              {job.date} {job.client}｜{jobStatus[job.id]}
            </button>
          </p>
        ))}
      </div>
    );
  }

  if (page === 4 && selectedJob) {
    const todayBag = bagByDate[selectedJob.date] || [];
    const todayUsed = usedByJob[selectedJob.id] || [];

    return (
      <div>
        <button onClick={() => setPage(3)}>回工作紀錄</button>

        <h1>
          {selectedJob.date} {selectedJob.client}
        </h1>

        <h2>工作狀態</h2>

        <select
          value={jobStatus[selectedJob.id]}
          onChange={(event) =>
            setJobStatus({
              ...jobStatus,
              [selectedJob.id]: event.target.value
            })
          }
        >
          <option>未開始</option>
          <option>進行中</option>
          <option>已完成</option>
        </select>

        <hr />

        <h2>工作流程</h2>
        <ol>
          <li>確認通告內容</li>
          <li>上傳或查看服裝照片</li>
          <li>確認今天帶出的化妝包</li>
          <li>勾選今天實際使用產品</li>
          <li>填寫備註</li>
          <li>切換為已完成</li>
        </ol>

        <hr />

        <h2>通告內容</h2>
        <textarea defaultValue={selectedJob.notice}></textarea>

        <h2>服裝照片</h2>
        <input type="file" />

        <h2>今天帶出的化妝包</h2>
        <p>已帶出 {todayBag.length} 件產品</p>
        <button onClick={() => setPage(5)}>編輯今天帶出的化妝包</button>

        <hr />

        <h2>今天實際使用</h2>

        {todayBag.length === 0 && <p>請先編輯今天帶出的化妝包</p>}

        {todayBag.map((item, index) => (
          <p key={index}>
            <input
              type="checkbox"
              checked={todayUsed.includes(item)}
              onChange={() => toggleUsed(selectedJob.id, item)}
            />
            {item}
          </p>
        ))}

        <h2>備註</h2>
        <textarea placeholder="例如：今天眼妝要配合服裝顏色"></textarea>
      </div>
    );
  }

  if (page === 5 && selectedJob) {
    const todayBag = bagByDate[selectedJob.date] || [];

    return (
      <div>
        <button onClick={() => setPage(4)}>完成，回工作頁</button>

        <h1>編輯今天帶出的化妝包</h1>
        <p>{selectedJob.date}</p>

        {categories.map((category) => {
          const searchText = categorySearch[category] || "";

          const filteredProducts = products.filter(
            (product) =>
              product.category === category &&
              product.name.includes(searchText)
          );

          return (
            <div key={category}>
              <h2>{category}</h2>

              <input
                placeholder={`搜尋${category}`}
                value={searchText}
                onChange={(event) =>
                  setCategorySearch({
                    ...categorySearch,
                    [category]: event.target.value
                  })
                }
              />

              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginTop: "10px"
                }}
              >
                {filteredProducts.length === 0 && <p>找不到產品</p>}

                {filteredProducts.map((product, index) => (
                  <p key={index}>
                    <input
                      type="checkbox"
                      checked={todayBag.includes(product.name)}
                      onChange={() => toggleBag(selectedJob.date, product.name)}
                    />
                    {product.name}
                  </p>
                ))}
              </div>

              <hr />
            </div>
          );
        })}
      </div>
    );
  }

  if (page === 6) {
    return (
      <div>
        <button onClick={() => setPage(3)}>回工作紀錄</button>

        <h1>新增工作流程</h1>

        <h2>1. 選日期</h2>
        <input type="date" />

        <h2>2. 選客人</h2>
        <input placeholder="輸入客人姓名" />

        <h2>3. 填通告內容</h2>
        <textarea placeholder="例如：節目錄影、平面拍攝、活動妝髮"></textarea>

        <h2>4. 服裝照片</h2>
        <input type="file" />

        <h2>5. 建立後再編輯今天帶出的化妝包</h2>
        <p>之後這裡會自動建立一筆新的工作紀錄。</p>

        <button onClick={() => alert("之後會真的新增一筆工作")}>
          建立工作
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>💄 Makeup Manager</h1>
      <h3>歡迎回來，妙妙！</h3>

      <hr />

      <button onClick={() => setPage(1)}>客人管理</button>
      <br />
      <br />

      <button onClick={() => setPage(2)}>化妝品資料庫</button>
      <br />
      <br />

      <button onClick={() => setPage(3)}>工作紀錄</button>
    </div>
  );
}

export default App;