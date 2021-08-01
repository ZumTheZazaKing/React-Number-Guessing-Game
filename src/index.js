import React from 'react';
import { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { MainMenu } from './mainMenu.js';
import { DifficultyMenu } from './difficulty.js';
import { Ingame } from './ingame.js';
import reportWebVitals from './reportWebVitals';



function Result(props){
  return <div id="result">
    <h3>{props.resultResponse}</h3>
    <p>The number was {props.randomNumber}</p>
    <button>Play Again</button>
  </div>;
}

function Leaderboard(){
  return <div></div>;
}


function App(){

  let [username, setUsername] = useState("");
  function changeUsername(e){setUsername(e.target.value)}

  let [difficulty, setDifficulty] = useState("easy");
  function changeDifficulty(e){setDifficulty(e.target.value);}

  let [difficultyValue, setDifficultyValue] = useState(100);
  function changeDifficultyValue(e){setDifficultyValue(e.target.name)}

  let [minRange, setMinRange] = useState(0);
  function changeMin(value){setMinRange(value)}

  let [maxRange, setMaxRange] = useState(100);
  function changeMax(value){setMaxRange(value)}

  let [randomNumber, setRandomNumber] = useState(0);
  function changeRandomNumber(value){setRandomNumber(value)}

  let [chances, setChances] = useState(10);
  function subtractChances(){setChances(chances-1)}
  function resetChances(){setChances(10)}

  let [userInput, setUserInput] = useState("");
  function onChangeInput(e){setUserInput(e.target.value)}
  function resetInput(){setUserInput("")}

  let [resultResponse, setResultResponse] = useState("");


  return <div id="container">

    <MainMenu handleChange={changeUsername}/>
    <DifficultyMenu 
    username={username} 
    difficulty={difficulty} 
    onClick={changeDifficulty}
    changeDifficultyValue={changeDifficultyValue}
    resetChances={resetChances}/>
    <Ingame 
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
    />
    <Result randomNumber={randomNumber} resultResponse={resultResponse}/>

  </div>

}



const el = <App/>;

ReactDOM.render(el, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
