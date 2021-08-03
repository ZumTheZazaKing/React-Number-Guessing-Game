import React from 'react';
import { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { MainMenu } from './mainMenu.js';
import { DifficultyMenu } from './difficulty.js';
import { Ingame } from './ingame.js';
import reportWebVitals from './reportWebVitals';



function Result(props){
  return <div id="result" className="hide" ref={props.resultRef}>
    <h3>{props.resultResponse}</h3>
    <p>The number was {props.randomNumber}</p>
    <button onClick={() => {props.resultToMain(); props.reset()}}>Play Again</button>
  </div>;
}

function Leaderboard(){
  return <div></div>;
}


function App(){

  let [username, setUsername] = useState("");
  function changeUsername(e){setUsername(e.target.value)}

  let [difficulty, setDifficulty] = useState("");
  function changeDifficulty(e){setDifficulty(e.target.value);}

  let [difficultyValue, setDifficultyValue] = useState(100);
  function changeDifficultyValue(e){setDifficultyValue(e.target.name)}

  let [minRange, setMinRange] = useState(0);
  function changeMin(value){setMinRange(value)}

  let [maxRange, setMaxRange] = useState(100);
  function changeMax(value){setMaxRange(value)}

  let [randomNumber, setRandomNumber] = useState(0);
  function changeRandomNumber(value){setRandomNumber(value)}

  let [hint, setHint] = useState("Guess The Number!");

  let [chances, setChances] = useState(10);
  function subtractChances(){setChances(chances-1)}
  function resetChances(){setChances(10)}

  let [userInput, setUserInput] = useState("");
  function onChangeInput(e){setUserInput(e.target.value)}
  function resetInput(){setUserInput("")}

  let [resultResponse, setResultResponse] = useState("");

  function reset(){
    setDifficulty("");
    setDifficultyValue(100);
    setMinRange(0);
    setMaxRange(100);
    setRandomNumber(0);
    setHint("Guess The Number!");
    setChances(10);
    limitBeforeRef.current.style.flex = 0;
    rangeRef.current.style.flex = 100 + "%";
    limitAfterRef.current.style.flex = 0;
  }

  let mainMenuRef = useRef();
  let difficultyRef = useRef();
  let ingameRef = useRef();
  let resultRef = useRef();

  

  function start(){
    mainMenuRef.current.className = "hide";
    difficultyRef.current.className = "";
  }

  function difficultyToIngame(){
    difficultyRef.current.className = "hide";
    ingameRef.current.className = "";
  }

  function ingameToResult(){
    ingameRef.current.className = "hide";
    resultRef.current.className = "";
  }

  function resultToMain(){
    resultRef.current.className = "hide";
    mainMenuRef.current.className = "";
  }

  let limitBeforeRef = useRef();
  let limitAfterRef = useRef();
  let rangeRef = useRef();

  function updateRange(){
    limitBeforeRef.current.style.flex = minRange + "%";
    rangeRef.current.style.flex = maxRange - minRange + "%";
    limitAfterRef.current.style.flex = difficultyValue - maxRange + "%";
  }


  return <div id="container">

    <MainMenu handleChange={changeUsername} mainMenuRef={mainMenuRef} start={start}/>
    <DifficultyMenu 
    username={username} 
    difficulty={difficulty} 
    onClick={changeDifficulty}
    changeDifficultyValue={changeDifficultyValue}
    resetChances={resetChances}
    difficultyRef={difficultyRef}
    difficultyToIngame={difficultyToIngame}/>
    <Ingame
    ingameRef={ingameRef} 
    changeMin={changeMin} 
    changeMax={changeMax}
    min={minRange} 
    max={maxRange} 
    difficulty={difficulty}
    difficultyValue={difficultyValue}
    randomNumber={randomNumber}
    changeRandomNumber={changeRandomNumber}
    chances={chances}
    subtractChances={subtractChances}
    userInput={userInput}
    onChangeInput={onChangeInput}
    setResultResponse={setResultResponse}
    resetInput={resetInput}
    hint={hint}
    setHint={setHint}
    ingameToResult={ingameToResult}
    limitBeforeRef={limitBeforeRef}
    rangeRef={rangeRef}
    limitAfterRef={limitAfterRef}
    updateRange={updateRange}
    />
    <Result 
    randomNumber={randomNumber} 
    resultResponse={resultResponse} 
    resultRef={resultRef}
    resultToMain={resultToMain}
    reset={reset}/>
    
  </div>

}



const el = <App/>;

ReactDOM.render(el, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
