import React from 'react';
import TestDataTable from './testDataTable';

import DashboardIcon from '@material-ui/icons/Dashboard';
import EditIcon from '@material-ui/icons/Edit';

const a = [3, 3, 3, 3, 3, 3, 3, 33, 3, 3, 33, 3, 3, 3]

const head = [
  {key: 'name', label: 'first name'},
  {key: 'cnic', label: 'CNIC'},
  {key: 'age', label: 'Age'},
  {key: 'actions', label: 'Action'},
  {key: 'lname', label: 'last name'},
]
const rows = [
  {name: 'talha',  mobileNo: '64851264512',age:96,lname:'fadsfad',cnic: '30015-454151512-4',},
  {name: 'sumair',  cnic: '61101-551151512-4',no:'adfadfa'},
  {name: 'test', age: 36,},
]

const Test = (props) => {

  const deleteHandler = (id) => {
    // console.log({id})
  }
  const editHandler = (id) => {
    // console.log({id})
  }
  return (
    <>
    <TestDataTable
      label={'Users'}
      head={head}
      rows={rows}
      actions={[{icon:DashboardIcon, handler:deleteHandler},{icon:EditIcon,handler:editHandler}]}
    />
    </>
  );
}

export default Test;
