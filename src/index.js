import React from 'react';
import { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import reportWebVitals from './reportWebVitals';


function MainMenu(){
  return <div id="mainMenu">
    <h2>Number Guessing Game</h2>
    <form>
      <input type="text" placeholder="Enter Name" required/>
      <br/><br/>
      <input type="submit" value="Start"/>
    </form>
  </div>;
}

function DifficultyMenu(){
  return <div id="difficulty">
    <p>Greetings, !</p>
    <h3>Difficulty</h3>
    <button>Easy</button>
    <button>Normal</button>
    <button>Hard</button>
  </div>;
}

function Ingame(){
  return <div id="ingame">
    <h3>Guess The Number!</h3>
    <p>Current Range: </p>
    <div id="bar">
      <div id="limitBefore"></div>
      <div id="range"></div>
      <div id="limitAfter"></div>
    </div>
    <p id="chances">Chances: </p>
    <form>
      <input type="number" min="0" max="100" required/>
      <input type="submit" value="Guess"/>
    </form>
  </div>;
}

function Result(){
  return <div id="result">
    <h3>Congrats! You guessed the number</h3>
    <p>The number was </p>
    <button>Play Again</button>
  </div>;
}

function Leaderboard(){
  return <div></div>;
}


function App(){

  return <div id="container">

    <MainMenu/>
    <DifficultyMenu/>
    <Ingame/>
    <Result/>

  </div>

}



const el = <App/>;

ReactDOM.render(el, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
