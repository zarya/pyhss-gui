import React from 'react';

import {InputField} from '@components';
import Grid from '@mui/material/Grid';

import i18n from '@app/utils/i18n';

const ImsSubscriberAddItem = (props: { onChange: ReturnType<typeof any>, state: ReturnType<typeof any> }) => {

  const { onChange, state } = props;

  return (
    <React.Fragment>
      <Grid container rowSpacing={1} spacing={1}>
        <Grid item xs={4}>
          <InputField
            value={state.imsi}
            onChange={onChange}
            id="imsi"
            label="IMSI"
          >{i18n.t('inputFields.desc.imsi')}</InputField>
        </Grid>
        <Grid item xs={4}>
          <InputField
            value={state.msisdn}
            onChange={onChange}
            id="msisdn"
            label="MSISDN"
          >{i18n.t('inputFields.desc.msisdn')}</InputField>
        </Grid>
        <Grid item xs={4}>
          <InputField
            value={state.msisdn_list}
            onChange={onChange}
            id="msisdn_list"
            label="MSISDN List"
          >{i18n.t('inputFields.desc.msisdn_list')}</InputField>
        </Grid>
        <Grid item xs={4}>
          <InputField
            value={state.ifc_path}
            onChange={onChange}
            id="ifc_path"
            label="ifc_path"
          >{i18n.t('inputFields.desc.ifc_path')}</InputField>
        </Grid>
        <Grid item xs={4}>
          <InputField
            value={state.sh_profile}
            onChange={onChange}
            id="sh_profile"
            label="SH Profile"
          >{i18n.t('inputFields.desc.sh_profile')}</InputField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ImsSubscriberAddItem;
