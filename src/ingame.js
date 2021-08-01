export function Ingame(){
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