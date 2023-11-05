/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, AucItem, AucAddModal, ErrorDialog} from '@components';
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
import i18n from '@app/utils/i18n';

const aucTemplate = {
  "ki": "",
  "opc": "",
  "amf": "",
  "iccid": "",
  "imsi": "",
  "batch_name": "",
  "sim_vendor": "",
  "esim": false,
  "lpa": "",
  "pin1": "",
  "pin2": "",
  "puk1": "",
  "puk2": "",
  "kid": "",
  "psk": "",
  "des": "",
  "adm1": "",
  "misc1": "",
  "misc2": "",
  "misc3": "",
  "misc4": ""
}

const Auc = () => {
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [searchParams] = useSearchParams();
  const [dialogData, setDialogData] = useState(aucTemplate);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

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

  const handleDelete = (id: number) => {
    AucApi.delete(id).then((data) => {
      console.log(id, data);
      refresh();
    }).catch((e)=> {
      console.log(e);
      setError(e);
    })
  }

  const handleAdd = () => {
    setEditMode(false);
    setOpenAdd(true);
  }
  const handleAddClose = () => {
    console.log('Closing add');
    setDialogData(aucTemplate);
    setOpenAdd(false);
    refresh();
  }
  const openEdit = (row: object) => {
    setEditMode(true);
    setDialogData(row);
    setOpenAdd(true);
  }

  const handleError = (err:string) => {
    setError(err);
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
                        <TableCell>{i18n.t('inputFields.header.id')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.imsi')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.iccid')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.simVendor')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.esim')}</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <AucItem key={row.auc_id} row={row} single={(aucSearch?true:false)} deleteCallback={handleDelete} openEditCallback={openEdit}/>
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
        <AucAddModal open={openAdd} handleClose={handleAddClose} data={dialogData} edit={editMode} onError={handleError}/>
        <ErrorDialog error={error} />
      </section>
    </div>
  );
};

export default Auc;
