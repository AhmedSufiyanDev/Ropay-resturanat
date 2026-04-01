import React from 'react';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {ClearIcon, UploadFile} from "../../../assets/images/images";
import TextField from "@material-ui/core/TextField";
import './style.scss'
import {styles} from '../inputStyle';
import {withStyles} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import {InputError} from "../../index";

function Index(props) {
  const {item, item: {id, label, value,defaultValue, error, labelWidth, placeholder}, onChangeInput, classes} = props;
  let showClose = item?.showClose || false;
  return (
    <div>
      <InputLabel className='mb-10' htmlFor={id} error={error}>{label}</InputLabel>
      <div style={{position: 'relative'}} className='display-flex align-items-center'>
        <OutlinedInput
          id={id || label}
          fullWidth
          placeholder={placeholder || label}
          value={value||defaultValue}
          error={error}
          helperText={item?.error}
          labelWidth={labelWidth}
          // style={{zIndex: -500}}
          endAdornment={<InputAdornment position={'end'}>
            <IconButton edge={'start'} className='pr-0'>
              <UploadFile style={{fontSize: 20}} />
            </IconButton>
          </InputAdornment>}
        />

        <TextField
          fullWidth
          id={id}
          type="file"
          // value={item.value}
          error={error}
          variant='outlined'
          helperText={item?.error}

          onChange={e => {
            const type = e.target?.files[0]?.type || ''
            // if ((item.fileType === 'excel') && (type === '.csv' ||
            //   type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            //   type === 'application/vnd.ms-excel'
            // )) {
            onChangeInput(e.target.files[0], id)
            // }
          }}
          className='file'
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            accept: item?.accept
            // inputMode: "numeric"
          }}
          inputProps={{accept: item?.accept}}
          labelWidth={labelWidth}
          InputLabelProps={{
            shrink: true,
            FormLabelClasses: {
              'root': {
                '&:focused': {
                  style: {color: 'red', border: '1px solid red'},
                  color: 'white'
                }
              },
              focused: 'true'
            }
          }}
        />
        {(item?.value && !showClose) && <ClearIcon
          style={{color: 'red', padding: 5}}
          className='cursor-pointer'
          onClick={e => {
            onChangeInput("", id)
          }}/>
        }
      </div>
      {error && <InputError message={error}/>}
    </div>
  );
}

export default withStyles(styles)(Index);
