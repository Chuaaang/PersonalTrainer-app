import React from 'react';
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'
import DeleteIcon from '@material-ui/icons/Delete';import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';

export default function CustomerList() {
    const [customers, setCustomers] = React.useState([{customer: {firstname: '', lastname: ''}}]);
    const [trainings, setTrainings] = React.useState([]);

    const [open, setOpen] = React.useState(false);
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
        if (window.confirm('Click OK to verify')) {
        const response = await Axios.delete(link);
        getCustomers();
        setMsg(`Customer ${customerName} deleted`);
        setOpen(true);
        }
    }

    const saveCustomer = async (customer) => {
        try {
        const response = await Axios.post('https://customerrest.herokuapp.com/api/customers', customer);
        getCustomers();
    } catch(err) {
        console.error(err);
    }
}

    const updateCustomer = async (customers, link) => {
        try {
            const response = await Axios.put(link, customers);
            getCustomers();
        } catch(err) {
            console.error(err);
        }
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
            <EditCustomer customer={row.original}  updateCustomer={updateCustomer} />)
        },
        {
            sortable: false,
            filterable: false,
            width:75,
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => {
                    const { firstname, lastname } = row.original;
                    const { href: link } = row.original.links[0];
                    deleteCustomer(`${firstname} ${lastname}`, link);
                }} > <DeleteIcon/>
                </Button>)
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