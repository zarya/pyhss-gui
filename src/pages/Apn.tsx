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
  
const apnTemplate = {
  "apn": "",
  "ip_version": 0,
  "pgw_address": "",
  "sgw_address": "",
  "charging_characteristics": "",
  "apn_ambr_dl": 0,
  "apn_ambr_ul": 0,
  "qci": 0,
  "arp_priority": 0,
  "arp_preemption_capability": false,
  "arp_preemption_vulnerability": false,
  "charging_rule_list": ""
}

const Apn = () => {
  const [apns, setAPNS] = useState([]);
  const [dialogData, setDialogData] = useState(apnTemplate);
  const [openAdd, setOpenAdd] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
    setEditMode(false);
    setOpenAdd(true);
  }
  const handleAddClose = () => {
    setOpenAdd(false);
    setDialogData(apnTemplate);
    refresh();
  }
  const openEdit = (row) => {
    setEditMode(true);
    setDialogData(row);
    setOpenAdd(true);
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
                        <TableCell>IP Version</TableCell>
                        <TableCell>QCI</TableCell>
                        <TableCell>SGW</TableCell>
                        <TableCell>PGW</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apns.map((row) => (
                        <ApnItem key={row.apn_id} row={row} chargingRules={chargingRules} deleteCallback={handleDelete} openEditCallback={openEdit} />
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
        <ApnAddItem open={openAdd} handleClose={handleAddClose} data={dialogData} edit={editMode} />
      </section>
    </div>
  );
};

export default Apn;
