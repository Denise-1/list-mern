import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getList() {
      const res = await fetch("/api/list");
      const list = await res.json();

      setMessage(list.msg);
    }
    getList(); // Call the async function here
  }, []);

  return (
    <main className="App">
      <h2>mern list</h2>
      {message && <p>{message}</p>}
    </main>
  );
}

export default App;
