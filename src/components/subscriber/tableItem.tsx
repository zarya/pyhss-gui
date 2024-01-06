import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';
import { DeleteDialog } from '@components';
import i18n from '@app/utils/i18n';

const SubscriberItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any>, openEditCallback: ReturnType<typeof any> }) => {
  const { row, deleteCallback, openEditCallback } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.imsi}
        </TableCell>
        <TableCell><Button component={NavLink} to={`/auc?auc=${row.auc_id}`} variant="outlined">{row.auc_id}</Button></TableCell>
        <TableCell>{(row.enabled?i18n.t('generic.yes'):i18n.t('generic.no'))}</TableCell>
        <TableCell>{(row.roaming_enabled?i18n.t('generic.yes'):i18n.t('generic.no'))} {row.roaming_rule_list}</TableCell>
        <TableCell>{row.msisdn}</TableCell>
        <TableCell>{row.apn_list} ({row.default_apn})</TableCell>
        <TableCell>{row.ue_ambr_dl}</TableCell>
        <TableCell>{row.ue_ambr_ul}</TableCell>
        <TableCell>{row.subscribed_rau_tau_timer}</TableCell>
        <TableCell>
          <Button onClick={() => openEditCallback(row)}><i className="fas fa-edit"></i></Button>
          <DeleteDialog id={row.subscriber_id} callback={deleteCallback}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {i18n.t('generic.details')}
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{i18n.t('generic.timestamp')}</TableCell>
                    <TableCell>{i18n.t('subscriber.mme')}</TableCell>
                    <TableCell>{i18n.t('subscriber.realm')}</TableCell>
                    <TableCell>{i18n.t('subscriber.peer')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="arp_preemption_capability">
                      <TableCell style={{ whiteSpace: 'nowrap'}}>{row.serving_mme_timestamp}</TableCell>
                      <TableCell>{row.serving_mme}</TableCell>
                      <TableCell>{row.serving_mme_realm}</TableCell>
                      <TableCell>{String(row.serving_mme_peer).replace(';','\n')}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default SubscriberItem;
