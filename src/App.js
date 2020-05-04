import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Customers from './components/Customers';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
          <Link to="/">Customers</Link> <Link to="/traininglist">Trainings</Link> <Link to="/calendar">Calendar</Link>{' '}
          <Route path="/" exact component={Customers} />
          <Route path="/TrainingList/" component={TrainingList} />
          <Route path="/Calendar" component={Calendar} />
      </BrowserRouter>
    </div>
  );
}

export default App;