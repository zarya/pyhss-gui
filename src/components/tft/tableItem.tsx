import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DeleteDialog } from '@components';

const TftItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any> }) => {
  const { row, deleteCallback } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {row.tft_group_id}
        </TableCell>
        <TableCell>{row.tft_string}</TableCell>
        <TableCell>{row.direction}</TableCell>
        <TableCell>{row.last_modified}</TableCell>
        <TableCell><DeleteDialog id={row.tft_id} callback={deleteCallback}/></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default TftItem;
