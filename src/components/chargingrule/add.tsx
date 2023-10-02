import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import {NetworkBandwidthFormatter} from '@components';

import i18n from '@app/utils/i18n';

import {ChargingRuleApi} from '../../services/pyhss';

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

const ChargingRuleAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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
      ChargingRuleApi.update(data.charging_rule_id, state).then((data) => {
        handleLocalClose();
      });
    } else {
      ChargingRuleApi.create(state).then((data) => {
        handleLocalClose();
      });
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
        <h3>Add</h3>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={1} rowSpacing={1}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="Name"
                  onChange={handleChange}
                  value={state.rule_name}
                  name="rule_name"
                 aria-describedby="rule_name-helper"
               />
               <FormHelperText id="rule_name-helper">Name of the rule</FormHelperText>
             </FormControl>
            </Grid>
           <Grid item xs={2}>
             <FormControl fullWidth style={{ marginTop: 8 }}>
               <InputLabel id="qci_label">QCI</InputLabel>
               <Select
                 labelId="qci_label"
                 value={state.qci}
                 label="qci"
                 onChange={handleChange}
                 name="qci"
                 aria-describedby="qci-helper-text"
               >
                 {Array.from(Array(9), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
               </Select>
             <FormHelperText id="qci-helper-text">QCI Value</FormHelperText>
             </FormControl>
           </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="tft_group_id"
                  onChange={handleChange}
                  value={state.tft_group_id}
                  name="tft_group_id"
                 aria-describedby="tft_group_id-helper"
               />
               <FormHelperText id="tft_group_id-helper">TFT Group</FormHelperText>
             </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="rating_group"
                  onChange={handleChange}
                  value={state.rating_group}
                  name="rating_group"
                 aria-describedby="rating_group-helper"
               />
               <FormHelperText id="rating_group-helper">Rating Group</FormHelperText>
             </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="precedence"
                  onChange={handleChange}
                  value={state.precedence}
                  name="precedence"
                 aria-describedby="precedence-helper"
               />
               <FormHelperText id="precedence-helper">Precedence of this rule, allows rule to override or be overridden by a higher priority rule</FormHelperText>
             </FormControl>
           </Grid>
            <Grid item xs={12}><h3>Bandwidth</h3></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="mbr_dl"
                  onChange={handleChange}
                  value={state.mbr_dl}
                  name="mbr_dl"
                  aria-describedby="mbr_dl-helper"
               />
               <FormHelperText id="mbr_dl-helper">Download bandwidth: <NetworkBandwidthFormatter data={state.mbr_dl} /></FormHelperText>
             </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="mbr_ul"
                  onChange={handleChange}
                  value={state.mbr_ul}
                  name="mbr_ul"
                  aria-describedby="mbr_ul-helper"
               />
               <FormHelperText id="mbr_ul-helper">Upload bandwidth: <NetworkBandwidthFormatter data={state.mbr_ul} /></FormHelperText>
             </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="gbr_dl"
                  onChange={handleChange}
                  value={state.gbr_dl}
                  name="gbr_dl"
                 aria-describedby="gbr_dl-helper"
               />
               <FormHelperText id="gbr_dl-helper">Download bandwidth: <NetworkBandwidthFormatter data={state.gbr_dl} /></FormHelperText>
             </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  id="outlined-required"
                  label="gbr_ul"
                  onChange={handleChange}
                  value={state.gbr_ul}
                  name="gbr_ul"
                 aria-describedby="gbr_ul-helper"
               />
               <FormHelperText id="gbr_ul-helper">Upload bandwidth: <NetworkBandwidthFormatter data={state.gbr_ul} /></FormHelperText>
             </FormControl>
            </Grid>
            <Grid item xs={12}><h3>ARP</h3></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="arp_priority_label">Priority</InputLabel>
                <Select
                  labelId="arp_priority_label"
                  value={state.arp_priority}
                  label="arp_priority"
                  onChange={handleChange}
                  name="arp_priority"
                  aria-describedby="arp_priority-helper-text"
                >
                  {Array.from(Array(15), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
                </Select>
                <FormHelperText id="arp_priority-helper-text">Allocation and Retention Policy - Bearer priority level</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="arp_preemption_capability_label">arp_preemption_capability</InputLabel>
                <Select
                  labelId="arp_preemption_capability_label"
                  value={state.arp_preemption_capability}
                  label="arp_preemption_capability"
                  onChange={handleChange}
                  name="arp_preemption_capability"
                  aria-describedby="arp_preemption_capability-helper"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
                <FormHelperText id="arp_preemption_capability-helper">Defines whether the service can be preempted by a higher-priority service</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="arp_preemption_vulnerability_label">arp_preemption_vulnerability</InputLabel>
                <Select
                  labelId="arp_preemption_vulnerability_label"
                  value={state.arp_preemption_vulnerability}
                  label="arp_preemption_vulnerability"
                  onChange={handleChange}
                  name="arp_preemption_vulnerability"
                  aria-describedby="arp_preemption_vulnerability-helper"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
                <FormHelperText id="arp_preemption_vulnerability-helper">Defines whether a bearer is applicable for such dropping by a preemption capable bearer with a higher priority value.</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
         </Box>
         <Button variant="contained" onClick={() => handleSave()}>{i18n.t('generic.save')}&nbsp;<i className="fas fa-save"></i></Button>
          &nbsp;
         <Button variant="contained" onClick={() => handleLocalClose()}>{i18n.t('generic.cancel')}</Button>
       </Box>
     </Modal>
    </React.Fragment>
  );
}

export default ChargingRuleAddItem;
