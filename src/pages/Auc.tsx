/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, AucItem, AucAddItem} from '@components';
import {AucApi} from "../services/pyhss"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSearchParams } from "react-router-dom";

const Auc = () => {
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [searchParams] = useSearchParams();

  const aucSearch = searchParams.get('auc');

  React.useEffect(() => {
    if (aucSearch) {
      AucApi.get(aucSearch).then((data => {
        setItems([data.data])
      }));
    } else {
      AucApi.getAll().then((data => {
        setItems(data.data)
      }));
    }
  }, []);

  const refresh = () => {
    if (aucSearch) {
      AucApi.get(aucSearch).then((data => {
        setItems([data.data])
      }));
    } else {
      AucApi.getAll().then((data => {
        setItems(data.data)
      }));
    }
  }

  const handleDelete = (id) => {
    AucApi.delete(id).then((data) => {
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
      <ContentHeader title={(aucSearch?'AUC':'AUCs')} />
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
                        <TableCell>IMSI</TableCell>
                        <TableCell>ICCID</TableCell>
                        <TableCell>Vendor</TableCell>
                        <TableCell>eSim</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <AucItem key={row.apn_id} row={row} single={(aucSearch?true:false)} deleteCallback={handleDelete}/>
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
        <AucAddItem open={openAdd} handleClose={handleAddClose} />
      </section>
    </div>
  );
};

export default Auc;
