import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import Calendar from "./components/Calendar";
import MenuTab from "./components/MenuTab";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography>Personal Trainer</Typography>
        </Toolbar>
        <MenuTab />
      </AppBar>
    </div>
  );
}

export default App;
/*
<BrowserRouter>
  <Link to="/">Customers</Link> <Link to="/traininglist">Trainings</Link>{" "}
  <Link to="/calendar">Calendar</Link>{" "}
  <Route path="/" exact component={Customers} />
  <Route path="/TrainingList/" component={TrainingList} />
  <Route path="/Calendar" component={Calendar} />
</BrowserRouter>;
*/
