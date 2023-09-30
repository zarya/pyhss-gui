/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, ChargingRuleItem, ChargingRuleAddItem} from '@components';
import {ChargingRuleApi} from "../services/pyhss"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ChargingRule = () => {
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  React.useEffect(() => {
    ChargingRuleApi.getAll().then((data => {
      setItems(data.data)
    }));
  }, []);

  const refresh = () => {
    ChargingRuleApi.getAll().then((data => {
      setItems(data.data)
    }));
  }

  const handleDelete = (id) => {
    ChargingRuleApi.delete(id).then((data) => {
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
      <ContentHeader title="Charging Rules" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>QCI</TableCell>
                        <TableCell>TFT Group</TableCell>
                        <TableCell>mbr_dl</TableCell>
                        <TableCell>mbr_ul</TableCell>
                        <TableCell>gbr_dl</TableCell>
                        <TableCell>gbr_ul</TableCell>
                        <TableCell>arp_priority</TableCell>
                        <TableCell>arp_preemption_capability</TableCell>
                        <TableCell>arp_preemption_vulnerability</TableCell>
                        <TableCell>precedence</TableCell>
                        <TableCell>rating_group</TableCell>
                        <TableCell>Last Modified</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <ChargingRuleItem key={row.tft_id} row={row} deleteCallback={handleDelete}/>
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
        <ChargingRuleAddItem open={openAdd} handleClose={handleAddClose} />
      </section>
    </div>
  );
};

export default ChargingRule;
