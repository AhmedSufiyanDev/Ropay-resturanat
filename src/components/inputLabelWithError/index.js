import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import {MenuItem, Select, FormHelperText, Chip} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {styles} from "../inputComponents/inputStyle";
import MultipleSelect from '../inputComponents/multiple'
import {InputError} from "../index";

// import {makeStyles, useTheme} from '@material-ui/core/styles';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function Input(props) {

  const {
    item = {},
    onChange, classes
  } = props;
  // console.log({item})
  const {
    id = '',
    type = 'text',
    label,
    labelWidth = 53,
    dropdownList = [],
    errorText,
    placeholder,
    value,
    error = '',
    required = false,
    min = 0, max,
    disable = false,
    defaultValue = '',
    title = ''
  } = item;

  return (
    <div>
      <InputLabel htmlFor={id} className='mb-10' error={error}>{label}</InputLabel>
      {
        (item?.type === 'select') ?
          <>
            {item?.multipleValues === true ?
              <MultipleSelect item={item} value={value} onChange={onChange} dropdownList={dropdownList}/>
              :
              <Select
                variant='outlined'
                displayEmpty={true}
                required={required}
                id={id || label}
                value={value}
                onChange={(event) => {
                  onChange(event.target.value, id || label)
                }}
                error={error}
                fullWidth
                margin='normal'
                // label={label}
                // labelWidth={labelWidth}
                // multiple={true}
                placeholder={'select '}
                disabled={disable}
                defaultValue={defaultValue}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              >
                {/*https://deep-0301.github.io/multi-step-form/*/}
                {/*https://github.com/deep-0301/multi-step-form*/}
                <MenuItem value="" disabled>
                  <em className='text-capitalize ' style={{color: 'lightgray'}}>{placeholder || title || label} </em>
                </MenuItem>
                {dropdownList.map((val, index) => (
                  <MenuItem className='text-capitalize' value={val.value}
                            key={`${val.value + index}`}>{val.text}</MenuItem>
                ))}
              </Select>}
            {/*{error && <FormHelperText className='error-class'>{error}</FormHelperText>}*/}
          </>
          :
          <TextField
            disabled={disable}
            id={id || label}
            type={type}
            value={value}
            variant="outlined"
            // margin="normal"
            required={required}
            fullWidth
            defaultValue={defaultValue}
            error={error}
            placeholder={type === 'email' ? 'username' : placeholder || label || id}
            onChange={(event) =>
              onChange(event.target.value, id || label)
            }
            // className={classes.textField}
            InputProps={{
              inputProps: {min: min, max},
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
            // labelWidth={labelWidth}
          />
      }
      {/*error message*/}
      {error && <InputError message={error}/>}
    </div>
  );
}

export default withStyles(styles)(Input);

// export default withStyles(styles)(Input);
//
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
//
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import TextField from '@material-ui/core/TextField';
//
// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
//
//   cssLabel: {
//     color : 'green'
//   },
//
//   cssOutlinedInput: {
//     '&$cssFocused $notchedOutline': {
//       // borderColor: `${theme.palette.primary.main} !important`,
//       borderColor: ` red !important`,
//     }
//   },
//
//   cssFocused: {},
//
//   notchedOutline: {
//     borderWidth: '1px',
//     borderColor: 'green !important'
//   },
//
// });
//
// class ValidField extends React.Component {
//   state = {
//     name: 'InputMode',
//   };
//
//   handleChange = name => event => {
//     this.setState({
//       [name]: event.target.value,
//     });
//   };
//
//   render() {
//     const { classes,item } = this.props;
//     const {
//     id,
//     type = 'text',
//     label,
//     labelWidth = 53,
//     dropdownList = [],
//     errorText,
//     value,
//     error,
//     required = false,
//     min, max,
//     disable = false,
//     defaultValue = '',
//   } = item;
//
//     return (
//       // <form className={classes.container} noValidate autoComplete="off">
//         <TextField
//           id="standard-name"
//           label="Name"
//           className={classes.textField}
//           value={this.state.name}
//           onChange={this.handleChange('name')}
//           margin="normal"
//           variant="outlined"
//           InputLabelProps={{
//             classes: {
//               root: classes.cssLabel,
//               focused: classes.cssFocused,
//             },
//           }}
//           InputProps={{
//             classes: {
//               root: classes.cssOutlinedInput,
//               focused: classes.cssFocused,
//               notchedOutline: classes.notchedOutline,
//             },
//             inputMode: "numeric"
//           }}
//         />
//       // </form>
//     );
//   }
// }
//
// ValidField.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(ValidField);
