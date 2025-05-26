import { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  function delayRes(index, nextWord) {
    setTimeout(function () {
      setResultData((old) => old + nextWord);
    }, 75 * index);
  }

  function newChat() {
    setLoading(false);
    setShowResult(false);
    setRecentPrompt("");
    setResultData("");
  }

  async function onSent(prompt) {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let res;
    if (prompt !== undefined) {
      res = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      res = await runChat(input);
    }
    // setRecentPrompt(input);
    // setPreviousPrompt((prev) => [...prev, input]);
    // const res = await runChat(input);
    let responseArr = res.split("**");
    let newRes = "";
    for (let i = 0; i < responseArr.length; i++) {
      // Only the first index and any even index will be considered because the splitting starts from the first **, which is at an odd position.
      if (i === 0 || i % 2 !== 1) {
        newRes += responseArr[i];
      } else {
        newRes += "<strong>" + responseArr[i] + "</strong>";
      }
    }
    // just to relpace * with new line
    let anotherNewRes = newRes.split("*").join("</br>");
    let newResponseArr = anotherNewRes.split(" ");
    for (let i = 0; i < newResponseArr.length; i++) {
      const nextWord = newResponseArr[i];
      delayRes(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  }

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        previousPrompt,
        setPreviousPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
