import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', customer: ""
      });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value});
    }

    return (
    <div>
        <Button variant="outlined" style={{margin: 10}} color="primary" onClick={handleClickOpen}>
          Add training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New training</DialogTitle>
            <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="activity"
              name="firstname"
              value={training.activity}
              label="activity"
              onChange={inputChanged}
              fullWidth
            />,
            <TextField
              margin="dense"
              id="duration"
              name="duration"
              value={training.duration}
              label="Duration"
              onChange={inputChanged}
              fullWidth
            />,
            <TextField
              margin="dense"
              id="date"
              name="date"
              value={training.date}
              label="Date"
              onChange={inputChanged}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={AddTraining} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    );
}