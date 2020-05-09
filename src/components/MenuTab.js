import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";
import Calendar from "./Calendar";

function Mebutab(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="Mebutab"
      hidden={value !== index}
      id={`simple-Mebutab-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

Mebutab.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-Mebutab-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label="Customers" />
            <Tab label="Trainings" />
            <Tab label="Calendar" />
          </Tabs>
        </AppBar>
        <Mebutab value={value} index={0}>
          <CustomerList />
        </Mebutab>
        <Mebutab value={value} index={1}>
          <TrainingList />
        </Mebutab>
        <Mebutab value={value} index={2}>
          <Calendar />
        </Mebutab>
      </Paper>
    </div>
  );
}
