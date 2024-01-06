import React from 'react';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DeleteDialog } from '@components';
import i18n from '@app/utils/i18n';

const RoamingRuleItem = (props: {
  row: ReturnType<typeof Object>,
  deleteCallback: ReturnType<typeof any>,
  openEditCallback: ReturnType<typeof any>,
  checked: boolean,
  network: ReturnType<typeof any>,
}) => {
  const { row, deleteCallback, openEditCallback, network } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{row.roaming_rule_id}</TableCell>
        <TableCell component="th" scope="row">
          {(network.find( a => a.roaming_network_id === row.roaming_network_id) || {'name':''}).name}
          &nbsp;({(network.find( a => a.roaming_network_id === row.roaming_network_id) || {'mcc':''}).mcc}
          {(network.find( a => a.roaming_network_id === row.roaming_network_id) || {'mnc':''}).mnc})
        </TableCell>
        <TableCell>{(row.allow?i18n.t('generic.yes'):i18n.t('generic.no'))}</TableCell>
        <TableCell>{(row.enabled?i18n.t('generic.yes'):i18n.t('generic.no'))}</TableCell>
        <TableCell>
          <Button onClick={() => openEditCallback(row)}><i className="fas fa-edit"></i></Button>
          <DeleteDialog id={row.roaming_rule_id} callback={deleteCallback}/>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default RoamingRuleItem;
