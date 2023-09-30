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

const SubscriberItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any> }) => {
  const { row, deleteCallback } = props;
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
        <TableCell align="right">{row.serving_mme}</TableCell>
        <TableCell><DeleteDialog id={row.subscriber_id} callback={deleteCallback}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>MSISDN</TableCell>
                    <TableCell>AUC</TableCell>
                    <TableCell>APN List</TableCell>
                    <TableCell>Default APN</TableCell>
                    <TableCell>AMBR DL</TableCell>
                    <TableCell>AMBR UL</TableCell>
                    <TableCell>Enabled</TableCell>
                    <TableCell>TAU Timer</TableCell>
                    <TableCell>MME</TableCell>
                    <TableCell>Realm</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="arp_preemption_capability">
                      <TableCell>{row.msisdn}</TableCell>
                      <TableCell><Button component={NavLink} to={`/auc?auc=${row.auc_id}`} variant="outlined">{row.auc_id}</Button></TableCell>
                      <TableCell>{row.apn_list}</TableCell>
                      <TableCell>{row.default_apn}</TableCell>
                      <TableCell>{row.ue_ambr_dl}</TableCell>
                      <TableCell>{row.ue_ambr_ul}</TableCell>
                      <TableCell>{(row.enabled?'Yes':'No')}</TableCell>
                      <TableCell>{row.subscribed_rau_tau_timer}</TableCell>
                      <TableCell>{row.serving_mme}</TableCell>
                      <TableCell>{row.serving_mme_realm}</TableCell>
                      <TableCell>{row.serving_mme_timestamp}</TableCell>
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
