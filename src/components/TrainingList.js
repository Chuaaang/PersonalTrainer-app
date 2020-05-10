import React from "react";
import "react-table-v6/react-table.css";
import ReactTable from "react-table-v6";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import AddTraining from "./AddTraining";
import Moment from "moment";

export default function TrainingList() {
  const [trainings, setTrainings] = React.useState([]);
  const [customers, setCustomers] = React.useState([{ customer: { firstname: "", lastname: "" } }]);

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState([]);

  const getTrainings = async () => {
    try {
      const response = await Axios.get("https://customerrest.herokuapp.com/gettrainings");
      const data = response.data;
      setTrainings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCustomers = async () => {
    try {
      const response = await Axios.get("https://customerrest.herokuapp.com/api/customers");
      const data = response.data;
      setCustomers(data.content);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getTrainings();
    getCustomers();
  }, []);

  const deleteTrainings = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((_) => getTrainings())
        .then((_) => {
          setMsg("Training deleted");
          setOpen(true);
        })
        .catch((err) => console.error(err));
    }
    console.log(link);
  };

  const AddTraining = async (training) => {
    try {
      const response = await Axios.post("https://customerrest.herokuapp.com/api/trainings");
      getTrainings();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTraining = async (customerName, link) => {
    if (window.confirm("Click OK to verify")) {
      const response = await Axios.delete(link);
      getTrainings();
      setMsg("Training deleted");
      setOpen(true);
    }
  };

  const columns = [
    {
      Cell: (row) => (
        <Button color="secondary" size="small" onClick={() => deleteTrainings("https://customerrest.herokuapp.com/api/trainings/" + row.original.id)}>
          Delete
        </Button>
      ),
    },
    {
      id: "date",
      Header: "Date",
      accessor: (row) => Moment(row.date).format("DD/MM/YYYY"),
    },
    {
      Header: "Duration(m)",
      accessor: "duration",
    },
    {
      Header: "Activity",
      accessor: "activity",
    },
    {
      Header: "First name",
      accessor: "customer.firstname",
    },
    {
      Header: "Last name",
      accessor: "customer.lastname",
    },
  ];

  return (
    <div>
      <ReactTable data={trainings} columns={columns} defaultPageSize={15} filterable={true} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={msg} />
    </div>
  );
}
