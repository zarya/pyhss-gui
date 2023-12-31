import React from 'react';
import Button from '@mui/material/Button';
import i18n from '@app/utils/i18n';

const SaveButtons = (props: {
  onClickSave: ReturnType<typeof Function>,
  onClickClose: ReturnType<typeof Function>,
  disabled?: boolean
}) => {
  const {onClickSave, onClickClose, disabled=false} = props;
  return (
    <span>
     <Button variant="contained" disabled={disabled} onClick={() => onClickSave()}>{i18n.t('generic.save')}&nbsp;<i className="fas fa-save"></i></Button>
      &nbsp;
     <Button variant="contained" onClick={() => onClickClose()}>{i18n.t('generic.cancel')}</Button>
    </span>
  )
}

export default SaveButtons;
