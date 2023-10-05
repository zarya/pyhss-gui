import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import i18n from '@app/utils/i18n';
import {NetworkBandwidthFormatter, InputField, SelectField} from '@components';
import {AucApi} from '../../services/pyhss';

const SubscriberAddItem = (props: { onChange: ReturnType<typeof any>, state: ReturnType<typeof any> }) => {
  const { onChange, state  } = props;
  const [auc, setAuc] = React.useState([]);
  const [aucLoading, setAucLoading] = React.useState(true);

  React.useEffect(() => {
    AucApi.getAll().then((data => {
      setAuc(data.data);
      setAucLoading(false);
    }));
  }, []);

  return (
    <React.Fragment>
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={4}>
              <InputField
                required
                value={state.imsi}
                onChange={onChange}
                id="imsi"
                label="IMSI"
              >{i18n.t('inputFields.desc.imsi')}</InputField>
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                loading={aucLoading}
                onChange={(_event, value) => {
                  if (value > 0) {
                    const auc_id=auc.find(a => a.imsi === value).auc_id;
                    const returnData = {
                      target: {name: 'auc_id', value: auc_id}
                    }
                    onChange(returnData);
                  }
                }}
                value={state.imsi}
                options={auc.map((option) => option.imsi)}
                renderInput={(params) => <TextField {...params} label="AUC" />}
              />
            </Grid>
            <Grid item xs={3}>
              <InputField
                required
                value={state.msisdn}
                onChange={onChange}
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
                required
                value={state.default_apn}
                onChange={onChange}
                id="default_apn"
                label="Default APN (id)"
              >ID of the default APN</InputField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                required
                value={state.apn_list}
                onChange={onChange}
                id="apn_list"
                label="APN list"
              >List of APN ids comma seperated</InputField>
            </Grid>
            <Grid item xs={12}><h3>QoS</h3></Grid>
            <Grid item xs={6}>
              <InputField
                required
                value={state.ue_ambr_ul}
                onChange={onChange}
                id="ue_ambr_ul"
                label="AMBR ul"
              >Agregated Maximum Bit Rate upload: <NetworkBandwidthFormatter data={state.ue_ambr_ul} /></InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField
                required
                value={state.ue_ambr_dl}
                onChange={onChange}
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
