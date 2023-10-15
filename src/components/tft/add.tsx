import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {SelectField, SaveButtons, InputField} from '@components';
import i18n from '@app/utils/i18n';

import {TftApi} from '../../services/pyhss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TftAddItem = (props: {
  open: boolean,
  handleClose: ReturnType<typeof any>,
  data: ReturnType<typeof Object>,
  edit: boolean
}) => {
  const { open, handleClose, data, edit } = props;
  const [state, setState] = useState(data);
  const [action, setAction] = useState('');
  const [gen_direction, setDirection] = useState('');
  const [protocol, setProtocol] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [filterResult, setFilterResult] = useState('');

  React.useEffect(() => {
    setState(data);
  }, [data])

  const handleChange = (name: string, value: string) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (edit) {
      TftApi.update(data.tft_id, state).then((data) => {
        handleLocalClose();
      });
    } else {
      TftApi.create(state).then((data) => {
        handleLocalClose();
      });
    }
  }

  const handleLocalClose = () => {
    handleClose();
  }

  const generateFilter = () => {
    const filterRule = `${action}${gen_direction ? ' ' + gen_direction : ''} ${protocol} from ${source} to ${destination}${selectedOption ? ' ' + selectedOption : ''}`;
    handleChange('tft_string', filterRule); 
  };

  const clearGenerator = () => {
    setSelectedOption('');
    setDestination('');
    setSource('');
    setDirection('');
    setProtocol('');
    setAction('');
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
        <h3>{(edit?i18n.t('generic.edit'):i18n.t('generic.add'))}</h3>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={3}>
              <InputField
                required
                label="Group"
                id="tft_group_id"
                onChange={handleChange}
                value={state.tft_group_id}
              >TFT Group</InputField>
            </Grid>
            <Grid item xs={9}>
              <InputField
                required
                label="Rule"
                id="tft_string"
                onChange={handleChange}
                value={state.tft_string}
              >Rule</InputField>
            </Grid>
            <Grid item xs={12}>
              <SelectField
                value={state.direction}
                onChange={handleChange}
                id="direction"
                label="Direction"
                helper="Defines traffic direction"
              >
                <MenuItem value={0}>Unspecified</MenuItem>
                <MenuItem value={1}>Downlink</MenuItem>
                <MenuItem value={2}>Uplink</MenuItem>
                <MenuItem value={3}>Bidirectional</MenuItem>
              </SelectField>
            </Grid>
          </Grid>
        </Box>
        <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} />
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={10}><h3>TFT Generator</h3></Grid>
            <Grid item xs={2}>
              <Button onClick={clearGenerator}>Clear</Button>
              <Button onClick={generateFilter} variant="contained">Generate <i class="fas fa-arrow-up"></i></Button>
            </Grid>
            <Grid item xs={1}>
              <SelectField
                required
                value={action}
                onChange={(name, value) => setAction(value)}
                id="action"
                label="Action"
                helper=""
              >
                <MenuItem value="permit">permit</MenuItem>
                <MenuItem value="deny">deny</MenuItem>
              </SelectField> 
            </Grid>
            <Grid item xs={1}>
              <SelectField
                value={gen_direction}
                onChange={(name, value) => setDirection(value)}
                id="gen_direction"
                label="Direction"
                helper=""
              >
                <MenuItem value="in">in</MenuItem>
                <MenuItem value="out">out</MenuItem>
              </SelectField> 
            </Grid>
            <Grid item xs={1}>
              <SelectField
                required
                value={protocol}
                onChange={(name, value) => setProtocol(value)}
                id="protocol"
                label="Protocol"
                helper=""
              >
                <MenuItem value="ip">ip (any)</MenuItem>
                <MenuItem value="tcp">tcp</MenuItem>
                <MenuItem value="udp">udp</MenuItem>
              </SelectField> 
            </Grid>
            <Grid item xs={3}>
              <InputField
                required
                label="Source"
                id="source"
                onChange={(name, value) => setSource(value)}
                value={source}
              >Source (prefix or any)</InputField>
            </Grid>
            <Grid item xs={3}>
              <InputField
                required
                label="Destination"
                id="destination"
                onChange={(name, value) => setDestination(value)}
                value={destination}
              >Destination (prefix or any)</InputField>
            </Grid>
            <Grid item xs={2}>
              <SelectField
                value={selectedOption}
                onChange={(name, value) => setSelectedOption(value)}
                id="selectedOption"
                label="Options"
                helper=""
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="frag">frag</MenuItem>
                <MenuItem value="ipMenuItems spec">ipMenuItems spec</MenuItem>
                <MenuItem value="tcpMenuItems spec">tcpMenuItems spec</MenuItem>
                <MenuItem value="established">established</MenuItem>
                <MenuItem value="setup">setup</MenuItem>
                <MenuItem value="tcpflags spec">tcpflags spec</MenuItem>
                <MenuItem value="icmptypes types">icmptypes types</MenuItem>
              </SelectField> 
            </Grid>
          </Grid>
         </Box>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default TftAddItem;
