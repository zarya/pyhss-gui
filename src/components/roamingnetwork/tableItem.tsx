import React from 'react';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DeleteDialog } from '@components';
import i18n from '@app/utils/i18n';

const RoamingNetworkItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any>, openEditCallback: ReturnType<typeof any>, checkboxCallback: any, checked: boolean }) => {
  const { row, deleteCallback, openEditCallback } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.roaming_network_id}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.mcc}</TableCell>
        <TableCell>{row.mnc}</TableCell>
        <TableCell>{row.preference}</TableCell>
        <TableCell>
          <Button onClick={() => openEditCallback(row)}><i className="fas fa-edit"></i></Button>
          <DeleteDialog id={row.roaming_network_id} callback={deleteCallback}/>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default RoamingNetworkItem;
