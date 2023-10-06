import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import i18n from '@app/utils/i18n';
import {NetworkBandwidthFormatter, InputField, SelectField} from '@components';
import {AucApi} from '../../services/pyhss';

const SubscriberAddItem = (props: {
onChange: any, 
state: any,
onError?: ReturnType<typeof Function>,
wizard?: boolean
edit?: boolean
}) => {
  const { onChange, state, onError=()=>{}, wizard=false, edit=false } = props;
  const [auc, setAuc] = React.useState([]);
  const [aucLoading, setAucLoading] = React.useState(true);
  const [errors, setErrors ] = React.useState({
    'imsi':'',
    'msisdn':'',
    'default_apn':'',
    'apn_list': '',
    'ue_ambr_ul': '',
    'ue_ambr_dl': ''
  })

  React.useEffect(() => {
    onValidate('imsi', state.imsi)
    onValidate('msisdn', state.msisdn)
    onValidate('default_apn', state.default_apn)
    onValidate('apn_list', state.apn_list)
    onValidate('ue_ambr_ul', state.ue_ambr_ul)
    onValidate('ue_ambr_dl', state.ue_ambr_dl)
    AucApi.getAll().then((data => {
      setAuc(data.data);
      setAucLoading(false);
    }));
  }, [state]);

  const setError = (name: string,value: string) => {
    setErrors(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const onValidate = (field: string, value: string) => {
    let error = ""
    if (field==='imsi' && value === '')
      error = 'Field is required!';
    else if (field==='imsi' && !/^\d*$/.test(value))
      error = 'Only numbers are allowed!';
    else if (field==='imsi' && value.length < 15)
      error = 'To short!';

    if (field==='msisdn' && value === '')
      error = 'Field is required!';
    else if (field==='msisdn' && !/^\d*$/.test(value))
      error = 'Only numbers are allowed!';
    
    if (field==='default_apn' && String(value) === '0')
      error = 'Field is required!';
    else if (field==='default_apn' && !/^\d*$/.test(value))
      error = 'Only numbers are allowed!';

    if (field==='apn_list' && value === '')
      error = 'Field is required!';
    else if (field==='apn_list' && !/^[1-8]*(,[1-8]*)*$/.test(value))
      error = 'Only comma seperated numbers are allowed!';

    if (field==='ue_ambr_ul' && String(value) === '0')
      error = 'Field is required!';
    else if (field==='ue_ambr_ul' && !/^\d*$/.test(value))
      error = 'Only numbers are allowed!';

    if (field==='ue_ambr_dl' && String(value) === '0')
      error = 'Field is required!';
    else if (field==='ue_ambr_dl' && !/^\d*$/.test(value))
      error = 'Only numbers are allowed!';

    setError(field, error);

    if (error!=='' || Object.values(errors).filter((a)=>a!=='').length > 0)
      onError(true);
    else
      onError(false);
  }

  const onChangeLocal = (name: string, value: string) => {
    onValidate(name, value);
    onChange(name, value);
  }

  const onChangeAuc = (auc: object) => {
    onChange('imsi', auc.imsi);
    onChange('auc_id', auc.auc_id);
    onValidate('imsi', auc.imsi);
  }

  return (
    <React.Fragment>
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={4}>
              <Autocomplete
                loading={aucLoading}
                onChange={(_event, value) => {
                  if (value > 0) {
                    onChangeAuc(auc.find(a => a.imsi === value));
                  }
                }}
                value={(auc.find(a => a.auc_id === state.auc_id) || {'imsi':''}).imsi}
                disabled={wizard || edit}
                options={auc.map((option) => option.imsi)}
                renderInput={(params) => <TextField {...params} label="AUC" />}
              />
            </Grid>
            <Grid item xs={3}>
              <InputField
                value={state.msisdn}
                error={errors.msisdn}
                onChange={onChangeLocal}
                id="msisdn"
                label="MSISDN"
              >{i18n.t('inputFields.desc.msisdn')}</InputField>
            </Grid>
            <Grid item xs={3}>
              <SelectField
                value={state.enabled}
                onChange={onChange}
                id="enabled"
                label="Enabled"
                helper="Subscriber enabled?"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={3}>
              <SelectField
                value={state.nam}
                onChange={onChange}
                id="nam"
                label="NAM"
                helper={i18n.t('inputFields.desc.nam')}
              >
                <MenuItem value="0">Packet and circuit</MenuItem>
                <MenuItem value="2">Packet only</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={12}><h3>APN</h3></Grid>
            <Grid item xs={4}>
              <InputField
                error={errors.default_apn}
                value={state.default_apn}
                onChange={onChangeLocal}
                id="default_apn"
                label="Default APN (id)"
              >ID of the default APN</InputField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                error={errors.apn_list}
                value={state.apn_list}
                onChange={onChangeLocal}
                id="apn_list"
                label="APN list"
              >List of APN ids comma seperated</InputField>
            </Grid>
            <Grid item xs={12}><h3>QoS</h3></Grid>
            <Grid item xs={6}>
              <InputField
                value={state.ue_ambr_ul}
                error={errors.ue_ambr_ul}
                onChange={onChangeLocal}
                id="ue_ambr_ul"
                label="AMBR ul"
              >Agregated Maximum Bit Rate upload: <NetworkBandwidthFormatter data={state.ue_ambr_ul} /></InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField
                error={errors.ue_ambr_dl}
                value={state.ue_ambr_dl}
                onChange={onChangeLocal}
                id="ue_ambr_dl"
                label="AMBR dl"
              >Agregated Maximum Bit Rate download: <NetworkBandwidthFormatter data={state.ue_ambr_dl} /></InputField>
            </Grid>
            <Grid item xs={12}><h3>Timers</h3></Grid>
            <Grid item xs={4}>
              <InputField
                value={state.subscribed_rau_tau_timer}
                onChange={onChange}
                id="subscribed_rau_tau_timer"
                label="RAU TAU Timer"
              >Periodic Tracking Area Update timer</InputField>
            </Grid>
          </Grid>
    </React.Fragment>
  );
}

export default SubscriberAddItem;
