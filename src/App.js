import React from "react";
import "./App.css";
import MenuTab from "./components/MenuTab";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
        <MenuTab />
      </AppBar>
    </div>
  );
}

export default App;
