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
import { DeleteDialog } from '@components';

const ImsSubscriberItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any> }) => {
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
        <TableCell>{row.msisdn} ({row.msisdn_list})</TableCell>
        <TableCell>{row.ifc_path}</TableCell>
        <TableCell>{row.sh_profile}</TableCell>
        <TableCell>{row.last_modified}</TableCell>
        <TableCell><DeleteDialog id={row.ims_subscriber_id} callback={deleteCallback}/></TableCell>
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
                    <TableCell>SCSCF</TableCell>
                    <TableCell>Realm</TableCell>
                    <TableCell>Peer</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell>{row.scscf}</TableCell>
                      <TableCell>{row.scscf_realm}</TableCell>
                      <TableCell>{row.scscf_peer}</TableCell>
                      <TableCell>{row.scscf_timestamp}</TableCell>
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

export default ImsSubscriberItem;
