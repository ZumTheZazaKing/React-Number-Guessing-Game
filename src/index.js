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
    <p>Time Taken: {props.recordedTime}s</p>
    <button id="playAgain" onClick={() => {props.resultToMain(); props.reset()}}>Play Again</button>
    <br/><br/>
    <button id="leaderboard" onClick={() => {props.resultToLeaderBoard()}}>Leaderboard</button>
  </div>;
}

function Leaderboard(props){
  let bil = 1;
  let leaderBoardDeter = props.leaderboardSelect;
  let leadersArr;
  if(leaderBoardDeter === "easy"){
    leadersArr = props.easyLeaders;
  } else if (leaderBoardDeter === "normal"){
    leadersArr = props.normalLeaders;
  } else  if (leaderBoardDeter === "hard"){
    leadersArr = props.hardLeaders;
  }

  function switchLeaderboard(e){

    if(e.target.id === "easy"){
      props.setLeaderboardSelect("easy");
      props.easyLeaderBoardRef.current.className = "selected";
      props.normalLeaderBoardRef.current.className = "";
      props.hardLeaderBoardRef.current.className = ""

    } else if (e.target.id === "normal"){
      props.setLeaderboardSelect("normal");
      props.easyLeaderBoardRef.current.className = "";
      props.normalLeaderBoardRef.current.className = "selected";
      props.hardLeaderBoardRef.current.className = ""

    } else if (e.target.id === "hard"){
      props.setLeaderboardSelect("hard");
      props.easyLeaderBoardRef.current.className = "";
      props.normalLeaderBoardRef.current.className = "";
      props.hardLeaderBoardRef.current.className = "selected"
      
    }
  }
  let leadersArrSorted = leadersArr.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
  if(leadersArrSorted.length >= 10){
    leadersArrSorted = leadersArrSorted.slice(0,10);
  }

  let tableItems;
  if(leadersArrSorted.length === 0){
    tableItems = <tr><td colSpan={3}>None so far</td></tr>
  } else {
    tableItems = leadersArrSorted.map(val => <tr><td>{bil++}</td><td>{val.username}</td><td>{val.time}s</td></tr>);
  }

  return <div id="leaderboard" className="hide" ref={props.leaderboardRef}>
    <h2>Local Leaderboard</h2>
    <button onClick={e => switchLeaderboard(e)} id="easy" className="selected" ref={props.easyLeaderBoardRef}>Easy</button>
    <button onClick={e => switchLeaderboard(e)} id="normal" ref={props.normalLeaderBoardRef}>Normal</button>
    <button onClick={e => switchLeaderboard(e)} id="hard" ref={props.hardLeaderBoardRef}>Hard</button>
    <br/>
    <table>
      <tr>
        <th>No.</th>
        <th>Username</th>
        <th>Time</th>
      </tr>
      {tableItems}
      </table>
    <button onClick={() => {props.leaderboardToResult()}}>Return</button>
  </div>;
}


function App(){

  let [easyLeaders, setEasyLeaders] = useState(JSON.parse(localStorage.getItem("zum_number_guessing_easy_leaders")) || []);
  localStorage.setItem("zum_number_guessing_easy_leaders", JSON.stringify(easyLeaders));

  let [normalLeaders, setNormalLeaders] = useState(JSON.parse(localStorage.getItem("zum_number_guessing_normal_leaders")) || []);
  localStorage.setItem("zum_number_guessing_normal_leaders", JSON.stringify(normalLeaders));

  let [hardLeaders, setHardLeaders] = useState(JSON.parse(localStorage.getItem("zum_number_guessing_hard_leaders")) || []);
  localStorage.setItem("zum_number_guessing_hard_leaders", JSON.stringify(hardLeaders));

  let [leaderboardSelect, setLeaderboardSelect] = useState("easy");

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

  let [timeTaken, setTimeTaken] = useState(0);
  let [recordedTime, setRecordedTime] = useState(0);


  function reset(){
    setDifficulty("");
    setDifficultyValue(100);
    setMinRange(0);
    setMaxRange(100);
    setRandomNumber(0);
    setHint("Guess The Number!");
    setChances(10);
    setRecordedTime(0);
    limitBeforeRef.current.style.flex = 0;
    rangeRef.current.style.flex = 100 + "%";
    limitAfterRef.current.style.flex = 0;
  }
  

  let mainMenuRef = useRef();
  let difficultyRef = useRef();
  let ingameRef = useRef();
  let resultRef = useRef();
  let leaderboardRef = useRef();

  

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

  function resultToLeaderBoard(){
    resultRef.current.className = "hide";
    leaderboardRef.current.className = "";
  }

  function leaderboardToResult(){
    resultRef.current.className = "";
    leaderboardRef.current.className = "hide";
  }

  let limitBeforeRef = useRef();
  let limitAfterRef = useRef();
  let rangeRef = useRef();

  function updateRange(){
    limitBeforeRef.current.style.flex = minRange + "%";
    rangeRef.current.style.flex = maxRange - minRange + "%";
    limitAfterRef.current.style.flex = difficultyValue - maxRange + "%";
  }

  let easyLeaderBoardRef = useRef();
  let normalLeaderBoardRef = useRef();
  let hardLeaderBoardRef = useRef();


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
    timeTaken={timeTaken}
    setTimeTaken={setTimeTaken}
    setRecordedTime={setRecordedTime}
    setDifficulty={setDifficulty}
    easyLeaders={easyLeaders}
    setEasyLeaders={setEasyLeaders}
    normalLeaders={normalLeaders}
    setNormalLeaders={setNormalLeaders}
    hardLeaders={hardLeaders}
    setHardLeaders={setHardLeaders}
    username={username}
    />
    <Result 
    randomNumber={randomNumber} 
    resultResponse={resultResponse} 
    resultRef={resultRef}
    resultToMain={resultToMain}
    reset={reset}
    resultToLeaderBoard={resultToLeaderBoard}
    timeTaken={timeTaken}
    recordedTime={recordedTime}/>

    <Leaderboard 
    leaderboardRef={leaderboardRef}
    leaderboardToResult={leaderboardToResult}
    easyLeaders={easyLeaders}
    normalLeaders={normalLeaders}
    hardLeaders={hardLeaders}
    leaderboardSelect={leaderboardSelect}
    setLeaderboardSelect={setLeaderboardSelect}
    easyLeaderBoardRef={easyLeaderBoardRef}
    normalLeaderBoardRef={normalLeaderBoardRef}
    hardLeaderBoardRef={hardLeaderBoardRef}
    />
    
  </div>

}



const el = <App/>;

ReactDOM.render(el, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
