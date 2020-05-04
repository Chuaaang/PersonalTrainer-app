import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

export default function EditTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: ''
    });

    const handleClickOpen = () => {
      console.log(props.customer)
      setTraining({
                  date: props.training.date,
                  duration: props.training.duration,
                  activity: props.training.activity
                })
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value});
    }

    const updateTraining = () => {
        props.updateTraining(training, props.training.links[0].href);
        handleClose();
    }

    return (
    <div>
        <Button color="primary" onClick={handleClickOpen}>
        <EditIcon/>
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
            <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              value={training.date}
              label="Date"
              onChange={e => inputChanged(e)}
              fullWidth
            />,
            <TextField
              margin="dense"
              name="firstname"
              value={training.duration}
              label="Duration"
              onChange={e => inputChanged(e)}
              fullWidth
            />,
            <TextField
              margin="dense"
              name="firstname"
              value={training.activity}
              label="Acivity"
              onChange={e => inputChanged(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={updateTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    );
}