export function MainMenu(props){
    return <div id="mainMenu">
      <h2>Number Guessing Game</h2>
      <form>
        <input type="text" placeholder="Enter Name" onChange={props.handleChange} required/>
        <br/><br/>
        <input type="submit" value="Start"/>
      </form>
    </div>;
}