/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, TftItem, TftAddItem} from '@components';
import {TftApi} from "../services/pyhss"
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

const Tft = () => {
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [searchParams] = useSearchParams();

  const tftSearch = searchParams.get('tft');

  React.useEffect(() => {
    TftApi.getAll().then((data => {
      setItems(data.data)
    }));
  }, []);

  const refresh = () => {
    TftApi.getAll().then((data => {
      setItems(data.data)
    }));
  }

  const handleDelete = (id) => {
    TftApi.delete(id).then((data) => {
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
      <ContentHeader title="TFTs" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell/>
                        <TableCell>Group</TableCell>
                        <TableCell>Rule</TableCell>
                        <TableCell>Direction</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <TftItem key={row.tft_id} row={row} deleteCallback={handleDelete}/>
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
        <TftAddItem open={openAdd} handleClose={handleAddClose} />
      </section>
    </div>
  );
};

export default Tft;
