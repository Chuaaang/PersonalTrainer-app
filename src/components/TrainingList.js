import React from 'react';
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import EditCustomer from './EditTraining'
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';
import AddTraining from './AddTraining';

export default function TrainingList() {
    const [trainings, setTrainings] = React.useState([]);
    const [customers, setCustomers] = React.useState([{customer: {firstname: "", lastname: ''}}]);

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState([]);

    const getTrainings = async () => {
        try {
            const response = await Axios.get('https://customerrest.herokuapp.com/api/trainings/');
            const data = response.data;
            setTrainings(data.content)
        } catch(err) {
            console.error(err);
        }
    }


    const getCustomers = async () => {
        try {
            const response = await Axios.get('https://customerrest.herokuapp.com/api/customers');
            const data = response.data;
            setCustomers(data.content);
        } catch(err) {
            console.error(err);
        }

    }

    React.useEffect(() => {
        getTrainings();
        getCustomers();
    }, [])

    const deleteTrainings = (link) => {
        if (window.confirm("Are you sure?")) {
            fetch(link, { method: 'DELETE' })
                .then(_ => getTrainings())
                .then(_ => {
                    setMsg('Training deleted');
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
        console.log(link);
    }

    const AddTraining = async (training) => {
        try {
            const response = await Axios.post('https://customerrest.herokuapp.com/api/trainings');
            getTrainings();
        } catch(err) {
            console.error(err);
        }
    } 


    const handleClose = () => {
        setOpen(false);
    }



    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        }

    ]


    return (
        <div>
            <ReactTable data={trainings} columns={columns} defaultPageSize={15} filterable={true} />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={msg} />
        </div>
    )
}