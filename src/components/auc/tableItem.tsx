import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DeleteDialog } from '@components';
import i18n from '@app/utils/i18n';

const AucItem = (props: { row: ReturnType<typeof Object>, single: ReturnType<typeof Boolean>, deleteCallback: ReturnType<typeof any>, openEditCallback: ReturnType<typeof any>, checkboxCallback: any, checked: boolean }) => {
  const { row, single, deleteCallback, openEditCallback, checkboxCallback = undefined, checked = false } = props;
  const [open, setOpen] = React.useState(single);

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
        {checkboxCallback && row.opc !== "" && (
        <TableCell>
          <Checkbox
            color="primary"
            id={row.auc_id}
            checked={checked}
            onClick={checkboxCallback}
            inputProps={{
              'aria-labelledby': row.auc_id,
            }}
          />
        </TableCell>
        )}
        <TableCell component="th" scope="row">
          {row.auc_id}
        </TableCell>
        <TableCell>{row.imsi}</TableCell>
        <TableCell>{row.iccid}</TableCell>
        <TableCell>{row.sim_vendor}</TableCell>
        <TableCell>{(row.esim?i18n.t('generic.yes'):i18n.t('generic.no'))}</TableCell>
        <TableCell>
          <Button onClick={() => openEditCallback(row)}><i className="fas fa-edit"></i></Button>
          <DeleteDialog id={row.auc_id} callback={deleteCallback}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {i18n.t('generic.details')} 
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{i18n.t('inputFields.header.batch')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.lpa')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.amf')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.sqn')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.pin1')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.puk1')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.pin2')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.puk2')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.misc1')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.misc2')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.misc3')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.misc4')}</TableCell>
                    <TableCell>{i18n.t('generic.lastModified')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell>{row.batch_name}</TableCell>
                      <TableCell>{row.lpa}</TableCell>
                      <TableCell>{row.amf}</TableCell>
                      <TableCell>{row.sqn}</TableCell>
                      <TableCell>{row.pin1}</TableCell>
                      <TableCell>{row.puk1}</TableCell>
                      <TableCell>{row.pin2}</TableCell>
                      <TableCell>{row.puk2}</TableCell>
                      <TableCell>{row.misc1}</TableCell>
                      <TableCell>{row.misc2}</TableCell>
                      <TableCell>{row.misc3}</TableCell>
                      <TableCell>{row.misc4}</TableCell>
                      <TableCell>{row.last_modified}</TableCell>
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

export default AucItem;
