import React from 'react';
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddTraining';
import EditCustomer from './EditTraining'
import DeleteIcon from '@material-ui/icons/Delete';

export default function TrainingList() {
    const [trainings, setTrainings] = React.useState([]);
    const [customers, setCustomers] = React.useState([{customer: {firstname: "", lastname: ''}}]);

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState([]);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(
                data => {

                    let datas = data;
                    datas.map((d,index) =>

                    {
                    if(d.customer != null)
                    d.customer.name = d.customer.firstname + ' ' + d.customer.lastname
                })

                setTrainings(datas)

                })
            .catch(err => console.error(err))
    }

    React.useEffect(() => {
        getCustomers();
        getTrainings();
    }, [])


    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    React.useEffect(() => {
        getCustomers();
        getTrainings();
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

    const saveTrainings = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainings)
        })
        .then(res => getTrainings())
        .catch(err => console.error(err))
    }

    const updateTrainings = (trainings, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainings)
        })
        .then(res => getTrainings())
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }



    const columns = [


        {
            sortable: false,
            filterable: false,
            width:75,
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteTrainings(row.original.links[0].href)}> <DeleteIcon/> </Button>)
        },
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Customer',
            accessor: ''
        }

    ]


    return (
        <div>
            <AddCustomer saveTrainings={saveTrainings} />
            <ReactTable data={customers} columns={columns} defaultPageSize={15} filterable={true} />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={msg} />
        </div>
    )
}