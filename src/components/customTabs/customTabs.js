import React from 'react';
import { Grid } from '@material-ui/core'

export default function CustomTabs(props) {

  const { tabsList, activeTab, handleChange, className } = props;

  return (
    <Grid container spacing={1} className={`pt-10 pb-10 mt-20 ${className}`} >
      {(tabsList || []).map((tab, index) => (
        <Grid item key={tab + index} className="nav-item mouse-pointer" onClick={() => handleChange(tab)} style={{ height: '50px' }}>
          <text className={`nav-link ${activeTab?.value === tab?.value && ' active-nav-link'}`}
            href="#tab-1">{tab?.label}</text>
        </Grid>
      ))}
    </Grid>

  );
}

