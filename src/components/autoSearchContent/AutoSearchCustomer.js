import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {CircularProgress, InputLabel} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {styles} from "../inputComponents/inputStyle";
import {InputError} from '../'

const AutoSearchContent = (props) => {

  const [open, setOpen] = React.useState(false);

  const {id, label, onChangeInput, loading, classes, error, searchValue, onChangeSearch, value, defaultValue,...rest} = props;
  useEffect(() => {
    if (!open) {
      // onChangeSearch('')
    }
  }, [open,onChangeSearch]);
  return (
    <>
      <InputLabel className='mb-15' error={error}>{label}</InputLabel>
      <Autocomplete
        // margin="normal"
        size="small"
        noOptionsText="Not found"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        style={{padding: 0}}
        getOptionLabel={(option) => {
          let title = option?.title || option?.text || option?.user?.name;
          // ` ${option.title } `
          return (title ?? '')
        }}
        onChange={(event, value) => onChangeInput(value?.value, id || label)}
        options={props.options}
        {...rest}

        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            // label={label}
            variant="outlined"
            value={value}
            onChange={(event) => {
              onChangeSearch(event.target.value)
            }}
            error={error}
            defaultValue={value?.text || value}
            InputProps={{
              ...params.InputProps,
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress size={20} className='mr-5p'/> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
      {error && <InputError message={error}/>}
    </>
  );
}


export default withStyles(styles)(AutoSearchContent);


