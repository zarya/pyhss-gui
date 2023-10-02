import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import i18n from '@app/utils/i18n';
import {NetworkBandwidthFormatter,InputField, SelectField, SaveButtons} from '@components';
import {ApnApi} from '../../services/pyhss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ApnAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof Function>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
  const { open, handleClose, data, edit } = props;
  const [state, setState] = React.useState(data);

   React.useEffect(() => {
       setState(data);
   }, [data]) 
  
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    if (edit) {
      ApnApi.update(data.apn_id, state).then(() => {
        handleClose();
      })
    } else {
      ApnApi.create(state).then(() => {
        handleClose();
      })
    }
  }

  const handleLocalClose = () => {
    handleClose();
  }

  return (
    <React.Fragment>
     <Modal
       open={open}
       onClose={handleLocalClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
        <h3>{(edit?i18n.t('generic.edit'):i18n.t('generic.add'))} APN</h3>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={4}>
              <InputField
                value={state.apn}
                onChange={handleChange}
                id="apn"
                label="APN"
              >APN Name</InputField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.ip_version}
                onChange={handleChange}
                id="ip_version"
                label="IP Version"
                helper="Version(s) of the ip that are enabled"
                >
                  <MenuItem key={1} value={0}>ipv4</MenuItem>
                  <MenuItem key={2} value={1}>ipv6</MenuItem>
                  <MenuItem key={3} value={2}>ipv4 and ipv6</MenuItem>
                  <MenuItem key={4} value={3}>ipv4 or ipv6</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={12}><h3>Gateway</h3></Grid>
            <Grid item xs={6}>
              <InputField
                value={state.pgw_address}
                onChange={handleChange}
                id="pgw_address"
                label="PGW"
              >
                IP/FQDN of the PGW
              </InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField
                value={state.sgw_address}
                onChange={handleChange}
                id="sgw_address"
                label="sGW"
              >
                IP/FQDN of the sGW
              </InputField>
            </Grid>
            <Grid item xs={12}><h3>Charging</h3></Grid>
            <Grid item xs={6}>
              <InputField
                value={state.charging_characteristics}
                onChange={handleChange}
                id="charging_characteristics"
                label="Charging Characteristics"
              >
                Charging characteristics
              </InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField
                value={state.charging_rule_list}
                onChange={handleChange}
                id="charging_rule_list"
                label="Charging rule list"
              >
                Comma seperated list of charging rules
              </InputField>
            </Grid>
            <Grid item xs={12}><h3>QoS</h3></Grid>
            <Grid item xs={3}>
              <SelectField
                value={state.qci}
                onChange={handleChange}
                id="qci"
                label="QCI"
                helper="QoS Class Identifier"
              >
                {Array.from(Array(9), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={state.apn_ambr_ul}
                onChange={handleChange}
                id="apn_ambr_ul"
                label="AMBR ul"
              >Agregated Maximum Bit Rate upload: <NetworkBandwidthFormatter data={state.apn_ambr_ul} /></InputField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={state.apn_ambr_dl}
                onChange={handleChange}
                id="apn_ambr_dl"
                label="AMBR dl"
              >Agregated Maximum Bit Rate download: <NetworkBandwidthFormatter data={state.apn_ambr_dl} /></InputField>
            </Grid>
            <Grid item xs={12}><h4>Allocation and Retention Priority (ARP)</h4></Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.arp_priority}
                onChange={handleChange}
                id="arp_priority"
                label="Priority"
                helper="Allocation and Retention Policy - Bearer priority level"
                >
                  {Array.from(Array(15), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.arp_preemption_capability}
                onChange={handleChange}
                id="arp_preemption_capability"
                label="Preemption capability"
                helper="Defines whether the service can be preempted by a higher-priority service"
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.arp_preemption_vulnerability}
                onChange={handleChange}
                id="arp_preemption_vulnerability"
                label="Preemption vulnerability"
                helper="Defines whether a bearer is applicable for such dropping by a preemption capable bearer with a higher priority value."
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
              </SelectField>
            </Grid>
          </Grid>
         </Box>
         <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} />
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default ApnAddItem;
