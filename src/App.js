import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import List from "./List";
import Form from "./Form";
import Ema from "./Ema";
function App() {
  const [llst, setLlst] = useState([]);
  const [fix, setFix] = useState(true);

  return (
    <div>
      {fix ? (
        <Form llst={llst} setLlst={setLlst} setFix={setFix} fix={fix} />
      ) : (
        <div>
          <Ema listOfFriends={llst} />
          <List listOfFriends={llst} />
        </div>
      )}
    
    </div>
  );
}

export default App;
