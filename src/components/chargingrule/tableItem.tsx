import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DeleteDialog } from '@components';

const ChargingRuleItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any> }) => {
  const { row, deleteCallback } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {row.rule_name}
        </TableCell>
        <TableCell>{row.qci}</TableCell>
        <TableCell>{row.tft_group_id}</TableCell>
        <TableCell>{row.mbr_dl}</TableCell>
        <TableCell>{row.mbr_ul}</TableCell>
        <TableCell>{row.gbr_dl}</TableCell>
        <TableCell>{row.gbr_ul}</TableCell>
        <TableCell>{row.arp_priority}</TableCell>
        <TableCell>{row.arp_preemption_capability}</TableCell>
        <TableCell>{row.arp_preemption_vulnerability}</TableCell>
        <TableCell>{row.precedence}</TableCell>
        <TableCell>{row.rating_group}</TableCell>
        <TableCell>{row.last_modified}</TableCell>
        <TableCell><DeleteDialog id={row.charging_rule_id} callback={deleteCallback}/></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default ChargingRuleItem;
