import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>{message ? message : "Loading..."}</h1>
    </div>
  );
};

export default App;
