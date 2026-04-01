export const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    // padding:10
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    // width: '100%',
    // backgroundColor:'red'
  },

  cssLabel: {
    color: `green !important`
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      // borderColor: `${theme.palette.primary.main} !important`,
      borderColor: `#f58220 !important`,
    }
  },

  cssFocused: {
    // borderWidth: '1px',
    // borderColor: 'green !important'
  },

  notchedOutline: {
    // borderWidth: '1px',
    // borderColor: 'green !important'
  },

});
