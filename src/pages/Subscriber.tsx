/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader, SubscriberItem} from '@components';
import {SubscriberApi} from "../services/pyhss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const Subscriber = () => {
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
                        <TableCell align="right">Serving MME</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscribers.filter(row => {
                          if (search === "") return row;
                          else if (row.imsi.includes(search)) return row; 
                          else if (row.msisdn.includes(search)) return row; 
                        }).map((row) => (
                        <SubscriberItem key={row.subscriber_id} row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscriber;
