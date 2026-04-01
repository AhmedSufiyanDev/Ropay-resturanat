import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup({ options, label }) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
const styles ={
    position:"absolute",
    left:"330px"
}
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label={label} name={label} value={value} onChange={handleChange}>
                {options.map((option) => (
                    <FormControlLabel style={{marginBottom:'15px'}}
                        key={option.value}
                        value={option.value}
                        control={<Radio/>}
                        label={
                            <div style={{ display: 'flex', alignItems: 'center',position:"relative" }} >
                                <img src={option.imgSrc} alt={option.label} style={{ marginRight: '8px', width: '46px', height: '46px', marginBottom: '10px' }} />
                                {option.label} <div className='side-on-price' style={styles}>BGN.{option.price}</div>                                    
                                </div>
                        }
                        // label={option.label}
                        // label={`${option.label} - ${option.price}`} 
                        disabled={option.disabled}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
