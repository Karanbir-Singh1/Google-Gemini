import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context= createContext();
const ContextProvider = (props)=>{
    const [input, setInput] = useState(""); 
    const[recentPrompts, setRecentPrompts] = useState("");
    const[prevPrompts, setPrevPrompts] = useState([]);
    const[showResults, setShowResults] = useState(false);
    const[loading, setLoading] = useState(false);
    const[resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
  setTimeout(() => {
    setResultData(prev => prev + nextWord);
  }, 75 * index);
}
const newChat=()=>{
    setLoading(false);
    setShowResults(false);

}

const onSent = async (prompt) => {
  setResultData("");
  setLoading(true);
  setShowResults(true);

  let finalPrompt = prompt !== undefined ? prompt : input;

  setPrevPrompts(prev => [...prev, finalPrompt]);
  setRecentPrompts(finalPrompt);

  let response = await runChat(finalPrompt);
  
   let responseArray= response.split("**");
   let newResponse="";
   for(let i=0; i<responseArray.length;i++)
    {
    if( i%2===0){
        newResponse += responseArray[i];
    }
    else{
        newResponse += "<b>"+responseArray[i]+"</b>";
    }
   }
   let newResponse2=newResponse.split("*").join("</br>");
   let newResponseArray= newResponse2.split(" ");
   for(let i=0;i<newResponseArray.length;i++){
    const nextWord= newResponseArray[i];
    delayPara(i, nextWord);
   }
 
  setLoading(false)
  setInput("")
};

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompts,
        recentPrompts,
        showResults,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );

}
export default ContextProvider;