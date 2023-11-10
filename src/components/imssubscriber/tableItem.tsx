import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DeleteDialog } from '@components';
import i18n from '@app/utils/i18n';

const ImsSubscriberItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any>, openEditCallback: ReturnType<typeof any> }) => {
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
        <TableCell>{row.msisdn} ({row.msisdn_list})</TableCell>
        <TableCell>{row.ifc_path}</TableCell>
        <TableCell>{row.sh_profile}</TableCell>
        <TableCell>{row.last_modified}</TableCell>
        <TableCell>
          <Button onClick={() => openEditCallback(row)}><i className="fas fa-edit"></i></Button>
          <DeleteDialog id={row.ims_subscriber_id} callback={deleteCallback}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {i18n.t('generic.details')} 
              </Typography>
              <Table size="small" aria-label="PCSCF and SCSCF">
                <TableHead>
                  <TableRow>
                    <TableCell>{i18n.t('generic.timestamp')}</TableCell>
                    <TableCell>{i18n.t('ims.pcscf')}</TableCell>
                    <TableCell>{i18n.t('ims.realm')}</TableCell>
                    <TableCell>{i18n.t('ims.peer')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ whiteSpace: 'nowrap'}}>{row.pcscf_timestamp}</TableCell>
                    <TableCell>{row.pcscf}</TableCell>
                    <TableCell>{row.pcscf_realm}</TableCell>
                    <TableCell>{String(row.pcscf_peer).replace(';','\n')}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell>{i18n.t('generic.timestamp')}</TableCell>
                    <TableCell>{i18n.t('ims.scscf')}</TableCell>
                    <TableCell>{i18n.t('ims.realm')}</TableCell>
                    <TableCell>{i18n.t('ims.peer')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ whiteSpace: 'nowrap'}}>{row.scscf_timestamp}</TableCell>
                    <TableCell>{row.scscf}</TableCell>
                    <TableCell>{row.scscf_realm}</TableCell>
                    <TableCell>{String(row.scscf_peer).replace(';','\n')}</TableCell>
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
