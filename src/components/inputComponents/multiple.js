import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    // width: '100%'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(item, dropDownList, theme) {
  return {
    fontWeight:
      dropDownList.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {item = {}, value = [],} = props;

 
  return (
    <Select
      labelId="demo-mutiple-chip-label"
      id={item?.id || item?.label}
      name={item?.id || item?.label}
      multiple
      fullWidth
      variant='outlined'
      value={value}
      onChange={(event) => {
        // console.log(value, event.target.value);
        let valesArray = [];
        if (!item?.create) {
          // edit case
          let vales = [];
          let updatedValues = [...event.target.value];

          for (let i = 0; i < updatedValues.length; i++) {
            //get values of updated list
            vales.push(updatedValues[i].value)
          }
          const arry = [...vales];

          // find duplicates values
          const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
          const duplicateElements = toFindDuplicates(arry);

          // remove duplicates
          let valuesArr = vales.filter(function (value, index) {
            return duplicateElements.indexOf(value) == -1;
          });

          // create dropdown object from values
          for (let i = 0; i < valuesArr.length; i++) {
            for (let j = 0; j < updatedValues.length; j++) {
              if (valuesArr[i] === updatedValues[j].value) {
                valesArray.push(updatedValues[j])
              }
            }
          }
        } else {
          // create or new case
          valesArray = [...event.target.value]
        }

        props.onChange(valesArray, item.id || item.label)
      }}
      // input={<Input id="select-multiple-chip" className='light-border' />}
      renderValue={(selected) => (
        <div className={classes.chips}>
          {selected.map((value) => {
            return (
              <Chip key={value} label={value?.text}/>
            )
          })}
        </div>
      )}
      MenuProps={MenuProps}
    >

      {/*<MenuItem value="">*/}
      {/*  <em>{item.title || item.label} (None)</em>*/}
      {/*</MenuItem>*/}
      {(props.dropdownList || []).map((item, index) => {
          let check = false
          for (let i = 0; i < value.length; i++) {
            if (value[i].value === item.value) {
              check = true;
              break;
            }
          }

          return (
            <MenuItem key={item} value={item} style={getStyles(item, props.dropdownList, theme)}>
              {/*<Checkbox checked={props?.value ? check : props.value.indexOf(item) > -1}/>*/}
              <Checkbox checked={check}/>
              <ListItemText primary={item?.text} className='text-capitalize'/>
            </MenuItem>
          )
        }
      )}
    </Select>
  );
}
