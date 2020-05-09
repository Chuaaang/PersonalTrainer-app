import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Axios from "axios";

export default function AddTraining(props) {
  const [customer, setCustomer] = React.useState([""]);
  const [training, setTraining] = React.useState({ activity: "", duration: "", date: "", customer: { customer } });
  const [msg, setMsg] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const addTraining = async () => {
    const customerLink = props.customerLink[0].href;
    const apiUrl = "https://customerrest.herokuapp.com/api/trainings";
    try {
      await Axios.post(apiUrl, trainingObj());
      setTraining({ ...training, activity: "", duration: "", date: "", customer: "" });
    } catch (err) {
      console.error(err);
    }

    handleClose();
  };

  const trainingObj = () => {
    // DATE YYYY-MM-DD
    const customerLink = props.customerLink[0].href;
    return {
      date: training.date,
      activity: training.activity,
      duration: training.duration,
      customer: customerLink,
    };
  };

  return (
    <div>
      <Button variant="outlined" style={{ margin: 10 }} color="primary" onClick={() => handleClickOpen()}>
        Add training
      </Button>
      <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="activity"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            fullWidth
          />
          <TextField margin="dense" id="duration" label="Duration" name="duration" value={training.duration} onChange={inputChanged} fullWidth />
          <TextField margin="dense" id="date" label="Date" name="date" value={training.date} onChange={inputChanged} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addTraining()} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
