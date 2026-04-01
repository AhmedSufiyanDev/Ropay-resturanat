import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {TextField, withStyles} from "@material-ui/core";
import {styles} from "../inputStyle";
import {InputError} from "../../index";

function InputPassword(props) {

  const {
    item,
    onChange,
    classes
  } = props;

  const {
    id = 'password',
    type = 'password',
    label = 'Password',
    labelWidth = 70,
    value,
    error,
    required = true,
  } = item;

  const [showPassword, setShowPassword] = useState(true)
  return (
    <>
      <InputLabel className='mb-15' htmlFor={id || label} error={error}>{label}</InputLabel>
      <OutlinedInput
        id={id || label}
        type={showPassword ? type : 'text'}
        value={value}
        margin="normal"
        variant='outlined'
        required={required}
        fullWidth
        error={error}
        placeholder='********'
        onChange={(event) =>
          onChange(event.target.value, id)
        }
        // labelWidth={labelWidth}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
          inputMode: "numeric"
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>}
      />
      {/*error message*/}
      {error && <InputError message={error}/>}
      {/*<p className='error-class'>{error}</p>*/}
    </>
  );
}

export default withStyles(styles)(InputPassword);
