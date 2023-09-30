/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, ApnItem, ApnAddItem} from '@components';
import {ApnApi, ChargingRuleApi} from "../services/pyhss"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Apn = () => {
  const [apns, setAPNS] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [chargingRules, setChargingRules] = useState([]);

  React.useEffect(() => {
    ApnApi.getAll().then((data => {
        setAPNS(data.data)
    }))
    ChargingRuleApi.getAll().then((data => {
        setChargingRules(data.data)
    }))
  }, []);

  const refresh = () => {
    ApnApi.getAll().then((data => {
        setAPNS(data.data)
    }))
    ChargingRuleApi.getAll().then((data => {
        setChargingRules(data.data)
    }))
  }

  const handleDelete = (id) => {
    ApnApi.delete(id).then((data) => {
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
      <ContentHeader title="APNs" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell/>
                        <TableCell>ID</TableCell>
                        <TableCell>APN</TableCell>
                        <TableCell align="right">IP Version</TableCell>
                        <TableCell align="right">QCI</TableCell>
                        <TableCell align="right">SGW</TableCell>
                        <TableCell align="right">PGW</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apns.map((row) => (
                        <ApnItem key={row.apn_id} row={row} chargingRules={chargingRules} deleteCallback={handleDelete} />
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
        <ApnAddItem open={openAdd} handleClose={handleAddClose} />
      </section>
    </div>
  );
};

export default Apn;
