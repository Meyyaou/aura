import { useState } from "react";
import Loading from "./components/Loading.jsx";
import GamePage from "./components/GamePage.jsx";

import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <GamePage />}
    </>
  );
}

export default App;
