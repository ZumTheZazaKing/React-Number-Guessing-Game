import React from 'react';
import { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { MainMenu } from './mainMenu.js';
import { DifficultyMenu } from './difficulty.js';
import { Ingame } from './ingame.js';
import reportWebVitals from './reportWebVitals';



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
