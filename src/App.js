import { useEffect, useState } from "react";
import dividerDesktop from "./assets/pattern-divider-desktop.svg";
import dividerMobile from "./assets/pattern-divider-mobile.svg";
import "./App.css";
import iconDice from "./assets/icon-dice.svg";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [advice, setAdvice] = useState({
    id: null,
    advice: null,
  });

  const fetchAdvice = async () => {
    setIsLoading(true);
    const id = Math.ceil(Math.random() * 200);
    try {
      const res = await fetch(`https://api.adviceslip.com/advice/${id}`);
      const data = await res.json();

      setAdvice({
        id: data.slip.id,
        advice: data.slip.advice,
      });
    } catch (e) {
      alert(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Advice #{advice.id}</h1>
        <p>{isLoading ? "Loading advice..." : advice.advice}</p>
        <picture>
          <source srcSet={dividerMobile} media="(max-width: 23.4375em)" />
          <img src={dividerDesktop} alt="" />
        </picture>
        <button type="button" onClick={fetchAdvice}>
          <img src={iconDice} alt="" />
        </button>
      </div>
    </div>
  );
};

export default App;
