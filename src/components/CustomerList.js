import React from 'react';
import axios from 'axios';
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';

export default function CustomerList() {
    const [customers, setCustomers] = React.useState([]);
    const [trainings, setTrainings] = React.useState([]);

    const [open, setOpen] = React.useState([]);
    const [msg, setMsg] = React.useState([]);



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
        getCustomers();
    }, [])


    const deleteCustomer = async (customerName, link) => {
        const response = await Axios.delete(link);
        getCustomers();
        setMsg(`Customer ${customerName} deleted`);
        setOpen(true);
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => getCustomers())
        .catch(err => console.error(err))
    }

    const updateCustomer = (customers, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customers)
        })
        .then(res => getCustomers())
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }



    const columns = [

        {
            Header: 'Actions',
            sortable: false,
            filterable: false,
            width:75,
            Cell: row => (
            <EditCustomer updateCustomer={updateCustomer} customer={row.original} />)
        },
        {
            sortable: false,
            filterable: false,
            width:75,
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteCustomer(row.original.links[0].href)}> <DeleteIcon/> </Button>)
        },
        {
            Header: 'First Name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        }

    ]

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable data={customers} columns={columns} defaultPageSize={15} filterable={true} />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={msg} />
        </div>
    )
}