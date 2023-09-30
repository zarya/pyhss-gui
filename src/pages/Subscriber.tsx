/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader, SubscriberItem, SubscriberAddItem} from '@components';
import {SubscriberApi} from "../services/pyhss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const Subscriber = () => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [subscribers, setSubscribers] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    SubscriberApi.getAll().then((data => {
        setSubscribers(data.data)
    }))
  }, []);

  const onSearchHandler = event => {
   setSearch(event.target.value);
  };

  const refresh = () => {
    SubscriberApi.getAll().then((data => {
        setSubscribers(data.data)
    }))
  }

  const handleDelete = (id) => {
    SubscriberApi.delete(id).then((data) => {
      console.log(id, data);
      refresh();
    })
  }

  const handleAdd = () => {
    setOpenAdd(true);
  }
  const handleAddClose = () => {
    setOpenAdd(false);
    refresh();
  }

  return (
    <div>
      <ContentHeader title="Subscribers" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <TextField id="search-field" label="Search" variant="outlined"  onChange={onSearchHandler} value={search} />
          </div>
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell/>
                        <TableCell>IMSI</TableCell>
                        <TableCell>Auc</TableCell>
                        <TableCell>Enabled</TableCell>
                        <TableCell>MSISDN</TableCell>
                        <TableCell>APN (default)</TableCell>
                        <TableCell>AMBR DL</TableCell>
                        <TableCell>AMBR UL</TableCell>
                        <TableCell>TUA Timer</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscribers.filter(row => {
                          if (search === "") return row;
                          else if (row.imsi.includes(search)) return row; 
                          else if (row.msisdn.includes(search)) return row; 
                        }).map((row) => (
                        <SubscriberItem key={row.subscriber_id} row={row} deleteCallback={handleDelete}/>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
          </div>
        </div>
        <SpeedDial
          ariaLabel="Add"
          sx={{ position: 'absolute', bottom: 80, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={() => handleAdd()}
          open={openAdd}
        />
        <SubscriberAddItem open={openAdd} handleClose={handleAddClose} />
      </section>
    </div>
  );
};

export default Subscriber;
