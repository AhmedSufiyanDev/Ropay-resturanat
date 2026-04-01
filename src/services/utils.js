import {C_OTC_STORAGE, getFormattedDate, mobileNumberRegex, PASSWORD,user} from "../environment";


export const getUserDataFromLocalStorage = () => {
  const userObj =
    (localStorage.getItem(user) && 
      JSON.parse(localStorage.getItem(user))) ||
    null; //(C_OTC_STORAGE)
  return userObj;
};
export const setUserDataInLocalStorage = (user) => {
  localStorage.setItem(C_OTC_STORAGE, JSON.stringify(user));
}

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
window.valid = validateEmail

export const validateMobile = (value) => { // check minimum length 7 max length is out bound
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (value.match(mobileNumberRegex));
}
window.checkMobile = validateMobile;
export const validatePassword = (password) => {
  if (
    (password !== undefined) && (password.trim() === "" || password.length < PASSWORD.passwordLength)
    // || !values.password.match('[a-z]')
    // || !values.password.match('[A-Z]')
    // || !values.password.match('[0-9]')
    // || !values.password.match(/[\*\.\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]/)
  ) {
    return (PASSWORD.passwordLengthError)
  }
  return null;

}
export const onChangeInput = (value, key, prevState, setState) => {
  setState((prevState) => ({
    ...prevState,
    values: {
      ...prevState.values,
      [key]: value,
    },
    errors: {
      ...prevState.errors,
      [key]: "",
    }
  }));
};

export const validateInputs = (values) => {
  let keys = Object.keys(values);
  const len = keys.length;
  let recordedErrors = {};
  let value = ''
  for (let i = 0; i < len; i++) {
    value = values[keys[i]];
    if (!(value == '0') && ( !value || value === undefined || value == "-1" || value.toString().trim().length <= 0)) {
      recordedErrors = {...recordedErrors, [keys[i]]: `${keys[i]} is required`}
    }
  }
  return (recordedErrors);
}
 
export const getDateFromDateTime = (date) => new Date(date).toLocaleDateString()
window.getDate = getDateFromDateTime

export const dateDisplayFormat = (date) => (new Date(date).toDateString()).substring(3);
window.dateDisplayFormat = dateDisplayFormat

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

window.addDays = addDays
window.subDays = subDays

export function subDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export function commaSeparateValue(value) {
  return value.toLocaleString();
}

export function generateRandomValue() {
  return (new Date().getTime()).toString(18)
}

 


export const helpClick = (data = [], handler) => {
  handler({open: true, data})
}

const getEmailReceiver = (status, cpName) => {
  let receiver = (status == 1 || status == 5) ? 'Finance Team' :
    (status == 2 || status == 3 || status == 8 || status == 9) ? "Business Team" :
      (status == 4 || status == 6 || status == 11) ? cpName :
        (status == 7 || status == 10) ? `Business Team/${cpName}` : cpName
  return receiver;
}

export const getEmailTemp = (row = {}) => {
  //console.log(row.status)
  const {cp_name, label_revenue, label_array, start_date, end_date, status} = row;
  let labelsArray = JSON.parse(label_array)
  // console.log(labelsArray.length)
  // labelsArray = []
  const labelsHTML = (labelsArray || []).map((item, index) => {
    // console.log(item);
    let grossRevenue = item.grossRevenue || 0
    grossRevenue = grossRevenue && grossRevenue.toFixed(2)
    let labelRevenue = item.labelRevenue || 0
    labelRevenue = labelRevenue && labelRevenue.toFixed(2);
    let labelShare = parseInt((item.label_share) * 100)
    return (
      `<tr key={index + item}>
        <td style="" >${item.label_name}</td>
        <td style="" >${getFormattedDate(start_date)} To ${getFormattedDate(end_date)}</td>
        <td style="" ><b>PKR</b> ${grossRevenue}</td>
        <td style="" >${labelShare}%</td>
        <td style="" ><b>PKR</b> ${labelRevenue}</td>
        <td style=" border:none; " rowSpan='3'><b>  Bajao</b></td>
      </tr>`
    )
  })

  // const status = row.status === 4 ? 'Hold' : row.status === 6 && 'Rejected'
  const statusObj = getStatusColor(row.status);
  const statusText = statusObj.statusText;
  const receiver = getEmailReceiver(row.status, cp_name)// return receiver name e.g dear Finance team etc


  const html = `
          <html><body>
           <h2>Dear <b>${receiver}</b> </h2>
            ${(status == 1) ? `<div>
      <p>Payment budget to be prepared as per the decided term.</p>
    </div>` :
    (status == 2) ? `<div>
      <p>Budget to be approved by Finance for Payments.</p>    </div>` :
      (status == 3) ? `<div>
      <p style='color:red;'>Budget is not approved by Finance for Payments due to following reason</p> </p>
      <p style='color:red;'>${row?.reason} </p> </div>` :
        (status == 5) ? `<div>
      <p> Uploaded Invoice is valid so proceed payment processing</p> </div>` :
          (status == 6) ? `<div>
      <p>Invoice Validation of the Uploaded Invoice is failed due to following reason:</p>
      <p style='color:red;'>${row?.reason} </p> </div>` :
            (status == 7 || status == 10) ? `<div>
         <p>The invoice amounting to a total of <b>PKR ${label_revenue.toFixed(2)} </b> has been cleared . </p>
      <p>BILL TO:<br/>Finance Team<br/>Rockville Technologies (Pvt) Ltd<br/>Rockville Building, Plot 67 & 82<br/>
        Business Square, Gulberg Greens, Islamabad<br/>Phone No: 051- 8438284<br/>NTN: 1887271-9 <br/>
      </p>
      <table width="80%" border="1">
        <thead>
        <tr>
          <th>Label</th>
          <th>Duration</th>
          <th>Gross revenue</th>
          <th>Label share</th>
          <th>Label revenue</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        ${labelsHTML}
        </tbody>
        <tr>
          <td style='padding=10px;text-transform: capitalize;' colSpan="4"><b>PKR</b>
            ${convertNumberToWords(parseInt(label_revenue.toFixed(2)))}</td>
          <td style="padding=10px"><b>PKR</b> ${label_revenue.toFixed(2)}</td>

        </tr>
      </table>
        <br/>
      <p>Taxes are deducted on the invoice as per the applicable rules of FBR. A tax deductions certificate
        will be provided as per law. As per the current applicable rates defined by FBR, the Withholding tax
        applicable on the invoice of an active filer, i.e. (Pvt.) Ltd companies are 8%, and the tax applicable
        on individuals and AoPs is 10%. In the case of non-filer/ In-active filer, the tax deducted will be 16%
        and 20% respectively.</p>
    </div>` :
              (status == 8) ? `<div>
      <p style='color:red;'>Payment Processing of the invoices received is on <b>Hold</b> due to following reason:</p>
      <p style='color:red;'>${row?.reason} </p> </div>` :
                (status == 9) ? `<div>
      <p style='color:red;'>To be put on hold in case of objection with comments due to following reason:</p>
      <p style='color:red;'>${row?.reason} </p> </div>` :
                  (status == 11) ? `<div>
      <p style='color:red;'>Incorrect Invoice to be marked <b>Rejected</b> due to following reason:</p>
      <p style='color:red;'>${row?.reason} </p> </div>` :
                    ([4, 5,].includes(row.status)) &&
                    `<div><p>Kindly raise the invoice amounting to a total of <b>PKR ${label_revenue.toFixed(2)}</b> for
      your share. Please send us the signed and scanned copy. </p>
      <p>BILL TO:<br/>Finance Team<br/>Rockville Technologies (Pvt) Ltd<br/>Rockville Building, Plot 67 & 82<br/>
        Business Square, Gulberg Greens, Islamabad<br/>Phone No: 051- 8438284<br/>NTN: 1887271-9 <br/>
      </p>
      <table width="80%" border="1">
        <thead>
        <tr>
          <th>Label</th>
          <th>Duration</th>
          <th>Gross revenue</th>
          <th>Label share</th>
          <th>Label revenue</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        ${labelsHTML}
        </tbody>
        <tr>
          <td style='padding=10px;text-transform: capitalize;' colSpan="4"><b>PKR</b>
            ${convertNumberToWords(parseInt(label_revenue.toFixed(2)))}</td>
          <td style="padding=10px"><b>PKR</b> ${label_revenue.toFixed(2)}</td>

        </tr>
      </table>
      <p style="background-color:orange;width: fit-content; padding: 10px ">Bank Name:
        Account Title:<br/>
        Account Number:<br/>
        Branch Code:<br/>
        NTN:
      </p>
      <p>Please mention the above-highlighted information on the invoice as the payment will be made via pay
        order so this information needs to be correct</p>
      <p>
        <b>Note: Payments will only be released to the account with whom the contract is signed. Rockville will
          not make any payments to any other individual or any 3rd party bank account.</b></p>
      <p>Taxes are deducted on the invoice as per the applicable rules of FBR. A tax deductions certificate
        will be provided as per law. As per the current applicable rates defined by FBR, the Withholding tax
        applicable on the invoice of an active filer, i.e. (Pvt.) Ltd companies are 8%, and the tax applicable
        on individuals and AoPs is 10%. In the case of non-filer/ In-active filer, the tax deducted will be 16%
        and 20% respectively.</p>
    </div>`
    // :`<div>
    // <p style='color:red;'>To be put on hold in case of objection with comments due to following reason:</p>
    // <p style='color:red;'>${row?.reason} </p> </div>`

  } 
           </body></html>`
  return {html, statusText}
}
// <p>Label Revenue: PKR ${rows[i].labelRevenue}</p>
// <p>Gross Ravenue: PKR ${rows[i].grossRevenue}</p>

const convertNumberToWords = (number) => {
  var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
  }

  // document.getElementById('number').onkeyup = function () {
  //   document.getElementById('words').innerHTML = inWords(document.getElementById('number').value);
  // };
  return inWords(number)
}

const pending = 'Pending';
const budgetAwaiting = 'Budgeting-Payment';
const awaitingBudgetApprovalSuccess = 'Awaiting-Budget-Approval(Success)';
const awaitingBudgetApprovalFailure = 'Awaiting-Budget-Approval(Failure)';
const invoicingEmailSuccess = 'Invoicing-Email (Success)';
const invoicingEmailFailure = 'Invoicing-Email (Failure)';
const pendingInvoiceApprovalSuccess = 'Pending-Invoice (Success)';
const pendingInvoiceApprovalFailure = 'Pending-Invoice (Failure)';
const pendingClearanceFromFinanceSuccess = 'Pending-Clearance-Finance (Invoice Cleared)';
const pendingClearanceFromFinanceFailure = 'Pending-Clearance-Finance (Failure)';
const onHoldByFinance = 'Hold-By-Finance';
const invoiceCleared = 'Invoice-Cleared';
const invoiceRejected = 'Invoice-Rejected';

export const getStatusColor = (value) => {
  let [statusText, statusColor, textColor] = value == 1 ? [budgetAwaiting, ' bg-red', 'color-red'] :
    value == 2 ? [awaitingBudgetApprovalSuccess, 'bg-orange', 'color-orange'] :
      value == 3 ? [awaitingBudgetApprovalFailure, 'bg-red', 'color-red'] :
        value == 4 ? [invoicingEmailSuccess, ' bg-green', ' color-green'] :
          // value == 5 ? [invoicingEmailFailure, ' bg-red', ' color-red'] :
          value == 5 ? [pendingInvoiceApprovalSuccess, ' bg-green', ' color-green'] :
            value == 6 ? [pendingInvoiceApprovalFailure, ' bg-red', ' color-red'] :
              value == 7 ? [pendingClearanceFromFinanceSuccess, ' bg-green', ' color-green'] :
                value == 8 ? [pendingClearanceFromFinanceFailure, ' bg-red', ' color-red'] :
                  value == 9 ? [onHoldByFinance, ' bg-red', ' color-red'] :
                    value == 10 ? [invoiceCleared, ' bg-green', ' color-green'] :
                      value == 11 ? [invoiceRejected, 'bg-red', ' color-red'] : [budgetAwaiting, 'bg-red', ' color-red']

  let obj = {statusText, statusColor, textColor}
  return (obj)
}
export const getCPStatusColor = (value) => {
  let [statusText, statusColor, textColor] = (value == 1||value == 2||value == 3) ? [pending, ' bg-red', 'color-red'] :
    // value == 2 ? [awaitingBudgetApprovalSuccess, 'bg-orange', 'color-orange'] :
    //   value == 3 ? [awaitingBudgetApprovalFailure, 'bg-red', 'color-red'] :
        value == 4 ? [invoicingEmailSuccess, ' bg-green', ' color-green'] :
          // value == 5 ? [invoicingEmailFailure, ' bg-red', ' color-red'] :
          value == 5 ? [pendingInvoiceApprovalSuccess, ' bg-green', ' color-green'] :
            value == 6 ? [pendingInvoiceApprovalFailure, ' bg-red', ' color-red'] :
              value == 7 ? [pendingClearanceFromFinanceSuccess, ' bg-green', ' color-green'] :
                value == 8 ? [pendingClearanceFromFinanceFailure, ' bg-red', ' color-red'] :
                  value == 9 ? [onHoldByFinance, ' bg-red', ' color-red'] :
                    value == 10 ? [invoiceCleared, ' bg-green', ' color-green'] :
                      value == 11 ? [invoiceRejected, 'bg-red', ' color-red'] : [budgetAwaiting, 'bg-red', ' color-red']

  let obj = {statusText, statusColor, textColor}
  return (obj)
}
export const getTwoStatusColor = (status) => {
  let [statusText, statusColor] = status == 1 ? ['active', ' color-green'] : ['in-active', 'color-red'];
  return {statusText, statusColor}
}
export const getTwoMgStatusColor = (status) => {
  let [statusText, statusColor] = status == 1 ? ['Recouped', ' color-green'] : ['not recouped', 'color-red'];
  return {statusText, statusColor}
}

// poc 2 not required
