import React from 'react';
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';

export default function CustomerList() {
    const [customers, setCustomers] = React.useState([]);



    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    React.useEffect(() => {
        getCustomers();
    }, [])


    const deleteCustomer = (link) => {
        if (window.confirm("Are you sure?")) {
            fetch(link, { method: 'DELETE' })
                .then(_ => getCustomers())
                .catch(err => console.error(err))
        }
        console.log(link);
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




    const columns = [

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
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</Button>)
        }


    ]


    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable data={customers} columns={columns} defaultPageSize={10} filterable={true} />

        </div>
    )
}