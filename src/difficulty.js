export function DifficultyMenu(props){

    function changeValues(e){
        props.onClick(e);
        props.changeDifficultyValue(e);
        props.resetChances();
    }

    return <div id="difficulty">
      <p>Greetings, {props.username}!</p>
      <h3>Difficulty</h3>
      <button onClick={e => {changeValues(e)}} value="easy" name="100">Easy</button>
      <button onClick={e => {changeValues(e)}} value="normal" name="1000">Normal</button>
      <button onClick={e => {changeValues(e)}} value="hard" name="10000">Hard</button>
    </div>;
  }