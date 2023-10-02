import React from 'react';
import TextField from '@mui/material/TextField';
import i18n from '@app/utils/i18n';

const ImsSubscriberAddItem = (props: { onChange: ReturnType<typeof any>, state: ReturnType<typeof any> }) => {

  const { onChange, state } = props;

  console.log(state);

  return (
    <React.Fragment>
          <TextField
            required
            id="outlined-required"
            label="IMSI"
            onChange={onChange}
            value={state.imsi}
            name="imsi"
          />
          <TextField
            required
            id="outlined-required"
            label="MSISDN"
            onChange={onChange}
            value={state.msisdn}
            name="msisdn"
          />
          <TextField
            required
            id="outlined-required"
            label="MSISDN list"
            onChange={onChange}
            value={state.msisdn_list}
            name="msisdn_list"
          />
          <TextField
            required
            id="outlined-required"
            label="ifc_path"
            onChange={onChange}
            value={state.ifc_path}
            name="ifc_path"
          />
          <TextField
            required
            id="outlined-required"
            label="sh_profile"
            onChange={onChange}
            value={state.sh_profile}
            name="sh_profile"
          />
    </React.Fragment>
  );
}

export default ImsSubscriberAddItem;
