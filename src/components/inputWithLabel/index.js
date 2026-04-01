import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyIcon from '@material-ui/icons/Money';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {styles} from "../inputComponents/inputStyle";

const useStyles = makeStyles((theme) => ({
  displayFlex: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: 10,
    // marginTop: 10
  }
}));

const Index = (props) => {
  const classes = useStyles();
  const classes1 = props;

  return (
    <div className={classes.displayFlex}>
      <div>
        <InputLabel className='mb-20' htmlFor={props.id || props.label} error={props.error}>{props.label}</InputLabel>
        <OutlinedInput
          // variant="outlined"
          margin='normal'
          id={props.id}
          // label={props.label}
          // labelWidth={props.labelWidth}
          type="number"
          value={props.value.dsvalue}
          onChange={(event) =>
            props.dsInputChange(props.index, 'rs', event.target.value)
          }
          disabled={props.disable}
          inputProps= {{min: props.min}}
          InputProps={{
            classes: {
              root: classes1.cssOutlinedInput,
              focused: classes1.cssFocused,
              notchedOutline: classes1.notchedOutline,
            },
            inputMode: "numeric"
          }}
          
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton
          //       //aria-label="toggle password visibility"
          //       //onClick={() => setShowPassword(!showPassword)}
          //       edge="end"
          //       className={props.buttonClass}
          //     >
          //       {props.icon && props.icon}
          //     </IconButton>
          //   </InputAdornment>}
        />
      </div>
      <div
        className={props.dsType === 'rs' ? "selected-icon custom-check ml-10 mouse-pointer" : "custom-check ml-10 mouse-pointer"}
        onClick={() => props.moneyIconClick('rs', props.index)}
      >
        <MoneyIcon/>
      </div>
      <div className={props.dsType === 'dollar' ? "selected-icon custom-check ml-10 mouse-pointer" : "custom-check ml-10 mouse-pointer"}
           onClick={() => props.moneyIconClick('dollar', props.index)}
      >
        <MonetizationOnIcon/>
      </div>
      {props.dsType === 'dollar' &&
      <div className="w-10 ">
        <InputLabel className='mb-20'>$ rate</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          type="number"
          value={props.value.dollarRate}
          onChange={(event) =>
            props.dsInputChange(props.index, 'dollar', event.target.value)
          }
          className={classes1.textField}
          InputProps={{
            inputProps: { min: props.min},
            classes: {
              root: classes1.cssOutlinedInput,
              focused: classes1.cssFocused,
              notchedOutline: classes1.notchedOutline,
            },
            inputMode: "numeric",
          }
          
        }
          disabled={props.disable}
          
        />
      </div>
      }
      {props.index > 0 &&
        <IconButton
          //aria-label="toggle password visibility"
          onClick={() => props.addDsInput(props.index)}
          edge="end"
          className={props.buttonClass}
        >
          {props.icon && props.icon}
        </IconButton>
      }   
    </div>
  );
}
export default withStyles(styles)(Index)
