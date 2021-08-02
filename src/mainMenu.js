export function MainMenu(props){

  function startGame(e){
    e.preventDefault();
    props.start();
  }

    return <div id="mainMenu" ref={props.mainMenuRef}>
      <h1>Number Guessing Game</h1>
      <form onSubmit={e => {startGame(e)}}>
        <input type="text" placeholder="Enter Name" onChange={props.handleChange} required/>
        <br/><br/>
        <input type="submit" value="Start"/>
      </form>
    </div>;
}