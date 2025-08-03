import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("");
  const [hello, setHello] = useState("");
  const [echoed, setEchoed] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/hello")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setHello(data.message);
      });
  }, []);

  const sendData = async () => {
    const res = await fetch("http://localhost:8000/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },  // ← 오타 수정
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    console.log(data);
    setEchoed(data.you_said);
  };

  const Button = () => (
    <div>
      <button onClick={sendData}>서버에 전송</button>
    </div>
  );

  const Inputbox = () => (
    <input
      placeholder="입력하세요"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );

  const List = () => {
    const items = ['React', 'Vite', 'JavaScript'];
    return (
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    );
  };

  const Counter = () => {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>Count : {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(0)}>0</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
      </div>
    );
  };

  return (
    <div className='App'>
      <h1>Vite + React</h1>
      <p>{hello}</p>

      <Inputbox />
      <Button />
      <p>서버 응답: {echoed}</p>

      <List />
      <Counter />
    </div>
  );
}

export default App;