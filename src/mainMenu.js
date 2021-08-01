export function MainMenu(props){
    return <div id="mainMenu">
      <h1>Number Guessing Game</h1>
      <form>
        <input type="text" placeholder="Enter Name" onChange={props.handleChange} required/>
        <br/><br/>
        <input type="submit" value="Start"/>
      </form>
    </div>;
}