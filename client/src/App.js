import { useEffect, useState } from "react";
import List from "./List";

function App() {
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getList() {
      const res = await fetch("/api/list");
      const list = await res.json();
      setList(list);
    }
    getList();
  }, []);

  const addNewItem = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/list", {
        method: "POST",
        body: JSON.stringify({ list: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newList = await res.json();
      setContent("");
      setList((prevList) => [...prevList, newList]);
    }
  };

  return (
    <main className="container">
      <h1 className="title">Mern List</h1>
      <form className="form-body" onSubmit={addNewItem}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter something"
          className="form__input"
          required
        />
        <button type="submit" className="form__btn">Add to List</button>
      </form>
      <section className="list-body">
        {list.length > 0 &&
          list.map((listItem) => (
            <List key={listItem._id} listItem={listItem} setList={setList} />
          ))}
      </section>
    </main>
  );
}

export default App;
