import { useEffect } from "react";

export function Ingame(props){

    function changeRange(){
        switch(props.difficulty){
            case 'easy':
                props.changeMax(100);
                break;

            case 'normal':
                props.changeMax(1000);
                break;

            case 'hard':
                props.changeMax(10000);
                break;
        }

    }

    function setRandomNumber(){
        let randomiser = Math.floor(Math.random()*parseInt(props.difficultyValue));
        props.changeRandomNumber(randomiser);
        console.log(randomiser);
    }

    useEffect(() => {
        changeRange();
        setRandomNumber();
    }, [props.difficulty]);

    function checkAnswer(e){
        e.preventDefault();
        props.resetInput();

        if(parseInt(props.userInput) < props.randomNumber){
            props.setHint("Guess is Lower");
            props.changeMin(parseInt(props.userInput)+1);

        } else if(parseInt(props.userInput) > props.randomNumber){
            props.setHint("Guess is Higher");
            props.changeMax(parseInt(props.userInput)-1);

        }

        if(parseInt(props.userInput) === props.randomNumber){
            props.setResultResponse("Congrats! You guessed the number");
        } else {
            props.subtractChances();

            if(parseInt(props.chances) === 1){
                props.setResultResponse("GAME OVER");
            }
        }
    }

    return <div id="ingame">
      <h3>{props.hint}</h3>
      <p id="rangeText">Current Range: {props.min} - {props.max}</p>
      <div id="bar">
        <div id="limitBefore"></div>
        <div id="range"></div>
        <div id="limitAfter"></div>
      </div>
      <p id="chances">Chances: {props.chances}</p>
      <form onSubmit={checkAnswer}>
        <input type="number" min={props.min} 
        max={props.max} onChange={props.onChangeInput} 
        value={props.userInput} required/>
        <input type="submit" value="Guess"/>
      </form>
    </div>;
  }