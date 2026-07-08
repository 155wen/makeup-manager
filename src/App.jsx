import { useState } from "react";
import Home from "./pages/Home";
import { getData, saveData } from "./utils/storage";

function App() {
  const [page, setPage] = useState("home");
  const [selectedJob, setSelectedJob] = useState(null);
  const [clientSearch, setClientSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState({});
  const [openCategory, setOpenCategory] = useState("");

  const [products, setProducts] = useState(() =>
    getData("products", [
      { name: "NARS 粉底 Oslo", category: "粉底" },
      { name: "MAC 粉底 NC20", category: "粉底" },
      { name: "Dior 遮瑕 2N", category: "遮瑕" },
      { name: "Chanel 粉餅 10", category: "粉餅" },
      { name: "3CE 腮紅", category: "腮紅" },
      { name: "Clio 眼影盤", category: "眼影" },
      { name: "妝前保濕精華", category: "保養品" },
      { name: "保濕妝前乳", category: "保養品" }
    ])
  );

  const [clients, setClients] = useState(() =>
    getData("clients", ["林小姐", "王小姐", "小安", "琪琪"])
  );

  const [jobs, setJobs] = useState(() =>
    getData("jobs", [
      { id: 1, date: "2026-07-06", client: "林小姐", notice: "節目錄影", status: "進行中" },
      { id: 2, date: "2026-07-06", client: "王小姐", notice: "平面拍攝", status: "未開始" }
    ])
  );

  const [bagByDate, setBagByDate] = useState(() =>
    getData("bagByDate", {
      "2026-07-06": ["MAC 粉底 NC20", "Dior 遮瑕 2N", "3CE 腮紅"]
    })
  );

  const [usedByJob, setUsedByJob] = useState(() =>
    getData("usedByJob", {
      1: ["MAC 粉底 NC20"],
      2: ["Dior 遮瑕 2N"]
    })
  );

  const [newProduct, setNewProduct] = useState({ name: "", category: "粉底" });
  const [newJob, setNewJob] = useState({ date: "", client: "", notice: "" });

  const categories = ["粉底", "遮瑕", "粉餅", "腮紅", "眼影", "保養品"];

  function updateProducts(value) {
    setProducts(value);
    saveData("products", value);
  }

  function updateClients(value) {
    setClients(value);
    saveData("clients", value);
  }

  function updateJobs(value) {
    setJobs(value);
    saveData("jobs", value);
  }

  function updateBag(value) {
    setBagByDate(value);
    saveData("bagByDate", value);
  }

  function updateUsed(value) {
    setUsedByJob(value);
    saveData("usedByJob", value);
  }

  function toggleBag(date, productName) {
    const current = bagByDate[date] || [];
    const next = current.includes(productName)
      ? current.filter((item) => item !== productName)
      : [...current, productName];

    updateBag({ ...bagByDate, [date]: next });
  }

  function toggleUsed(jobId, productName) {
    const current = usedByJob[jobId] || [];
    const next = current.includes(productName)
      ? current.filter((item) => item !== productName)
      : [...current, productName];

    updateUsed({ ...usedByJob, [jobId]: next });
  }

  function addProduct() {
    if (!newProduct.name) return alert("請輸入產品名稱");

    updateProducts([...products, newProduct]);
    setNewProduct({ name: "", category: "粉底" });
  }

  function addJob() {
    if (!newJob.date || !newJob.client) return alert("請輸入日期和客人");

    const id = Date.now();
    const job = {
      id,
      date: newJob.date,
      client: newJob.client,
      notice: newJob.notice,
      status: "未開始"
    };

    updateJobs([...jobs, job]);

    if (!clients.includes(newJob.client)) {
      updateClients([...clients, newJob.client]);
    }

    setNewJob({ date: "", client: "", notice: "" });
    setPage("jobs");
  }

  function updateStatus(jobId, status) {
    updateJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status } : job
      )
    );
  }

  function applyHistoryBag(date, historyBag, mode) {
    const current = bagByDate[date] || [];

    if (mode === "replace") {
      updateBag({ ...bagByDate, [date]: historyBag });
    }

    if (mode === "add") {
      updateBag({
        ...bagByDate,
        [date]: Array.from(new Set([...current, ...historyBag]))
      });
    }
  }

  if (page === "clients") {
    const filtered = clients.filter((client) => client.includes(clientSearch));

    return (
      <div>
        <button onClick={() => setPage("home")}>回首頁</button>
        <h1>客人管理</h1>

        <input
          placeholder="搜尋客人"
          value={clientSearch}
          onChange={(e) => setClientSearch(e.target.value)}
        />

        <hr />

        {filtered.map((client) => {
          const clientJobs = jobs.filter((job) => job.client === client);

          return (
            <div key={client}>
              <h2>{client}</h2>
              <h3>歷史使用產品</h3>

              {clientJobs.length === 0 && <p>目前沒有紀錄</p>}

              {clientJobs.map((job) => (
                <div key={job.id}>
                  <p>{job.date}</p>
                  <p>{(usedByJob[job.id] || []).join("、") || "尚未記錄"}</p>
                </div>
              ))}

              <hr />
            </div>
          );
        })}
      </div>
    );
  }

  if (page === "products") {
    return (
      <div>
        <button onClick={() => setPage("home")}>回首頁</button>
        <h1>化妝品資料庫</h1>

        <h2>新增化妝品</h2>

        <input
          placeholder="產品名稱"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />

        <select
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button onClick={addProduct}>新增</button>

        <hr />

        {categories.map((cat) => (
          <div key={cat}>
            <h2>{cat}</h2>
            {products
              .filter((product) => product.category === cat)
              .map((product, index) => (
                <p key={index}>💄 {product.name}</p>
              ))}
          </div>
        ))}
      </div>
    );
  }

  if (page === "jobs") {
    return (
      <div>
        <button onClick={() => setPage("home")}>回首頁</button>
        <h1>工作紀錄</h1>

        <button onClick={() => setPage("newJob")}>＋ 新增工作</button>

        <hr />

        {jobs.map((job) => (
          <p key={job.id}>
            <button
              onClick={() => {
                setSelectedJob(job);
                setPage("jobDetail");
              }}
            >
              {job.date} {job.client}｜{job.status}
            </button>
          </p>
        ))}
      </div>
    );
  }

  if (page === "newJob") {
    return (
      <div>
        <button onClick={() => setPage("jobs")}>回工作紀錄</button>
        <h1>新增工作</h1>

        <p>日期</p>
        <input
          type="date"
          value={newJob.date}
          onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
        />

        <p>客人</p>
        <input
          placeholder="輸入客人姓名"
          value={newJob.client}
          onChange={(e) => setNewJob({ ...newJob, client: e.target.value })}
        />

        <p>通告內容</p>
        <textarea
          value={newJob.notice}
          onChange={(e) => setNewJob({ ...newJob, notice: e.target.value })}
        />

        <br />
        <br />

        <button onClick={addJob}>建立工作</button>
      </div>
    );
  }

  if (page === "jobDetail" && selectedJob) {
    const job = jobs.find((item) => item.id === selectedJob.id);
    const todayBag = bagByDate[job.date] || [];
    const todayUsed = usedByJob[job.id] || [];

    return (
      <div>
        <button onClick={() => setPage("jobs")}>回工作紀錄</button>

        <h1>{job.date} {job.client}</h1>

        <h2>工作狀態</h2>
        <select
          value={job.status}
          onChange={(e) => updateStatus(job.id, e.target.value)}
        >
          <option>未開始</option>
          <option>進行中</option>
          <option>已完成</option>
        </select>

        <h2>通告內容</h2>
        <p>{job.notice || "尚未填寫"}</p>

        <h2>服裝照片</h2>
        <input type="file" />

        <h2>今天帶出的化妝包</h2>
        <p>已帶出 {todayBag.length} 件產品</p>
        <button onClick={() => setPage("bagEditor")}>編輯今天帶出的化妝包</button>

        <hr />

        <h2>今天實際使用</h2>

        {todayBag.length === 0 && <p>請先編輯今天帶出的化妝包</p>}

        {todayBag.map((item) => (
          <p key={item}>
            <input
              type="checkbox"
              checked={todayUsed.includes(item)}
              onChange={() => toggleUsed(job.id, item)}
            />
            {item}
          </p>
        ))}

        <h2>備註</h2>
        <textarea placeholder="備註"></textarea>
      </div>
    );
  }

  if (page === "bagEditor" && selectedJob) {
    const job = jobs.find((item) => item.id === selectedJob.id);
    const todayBag = bagByDate[job.date] || [];

    const historyJobs = jobs.filter(
      (item) =>
        item.id !== job.id &&
        bagByDate[item.date] &&
        bagByDate[item.date].length > 0
    );

    return (
      <div>
        <button onClick={() => setPage("jobDetail")}>完成，回工作頁</button>

        <h1>編輯今天帶出的化妝包</h1>
        <p>{job.date} {job.client}</p>

        <h2>歷史帶出紀錄</h2>

        {historyJobs.length === 0 && <p>目前沒有歷史化妝包</p>}

        {historyJobs.map((history) => {
          const historyBag = bagByDate[history.date] || [];

          return (
            <div key={history.id}>
              <p>
                {history.date} {history.client}（{historyBag.length} 件）
              </p>

              <button onClick={() => applyHistoryBag(job.date, historyBag, "replace")}>
                取代成這包
              </button>

              <button onClick={() => applyHistoryBag(job.date, historyBag, "add")}>
                加入這包
              </button>

              <hr />
            </div>
          );
        })}

        <h2>產品分類</h2>

        {categories.map((cat) => {
          const isOpen = openCategory === cat;
          const searchText = categorySearch[cat] || "";

          const list = products.filter(
            (product) =>
              product.category === cat &&
              product.name.includes(searchText)
          );

          const selectedCount = products.filter(
            (product) =>
              product.category === cat &&
              todayBag.includes(product.name)
          ).length;

          return (
            <div key={cat}>
              <button onClick={() => setOpenCategory(isOpen ? "" : cat)}>
                {isOpen ? "▼" : "▶"} {cat}（{selectedCount}/{products.filter((p) => p.category === cat).length}）
              </button>

              {isOpen && (
                <div>
                  <input
                    placeholder={`搜尋${cat}`}
                    value={searchText}
                    onChange={(e) =>
                      setCategorySearch({
                        ...categorySearch,
                        [cat]: e.target.value
                      })
                    }
                  />

                  <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
                    {list.map((product) => (
                      <p key={product.name}>
                        <input
                          type="checkbox"
                          checked={todayBag.includes(product.name)}
                          onChange={() => toggleBag(job.date, product.name)}
                        />
                        {product.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <hr />
            </div>
          );
        })}
      </div>
    );
  }

return <Home setPage={setPage} />;
}

export default App;