import { useState, useEffect } from "react";
import Loading from "./components/Loading.jsx";
import GamePage from "./components/GamePage.jsx";

import "./App.css";

function App() {
  //added loading effect
  const [isLoading, setLoading] = useState(true);
  useEffect(()=>{
    const timeId=setTimeout(()=>{
      setLoading(false)
    },3000)
    return ()=>{
      clearTimeout(timeId)
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <GamePage />}
    </>
  );
}

export default App;
