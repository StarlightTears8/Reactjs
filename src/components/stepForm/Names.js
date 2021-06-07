import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {connect } from 'react-redux';

const steps = ['Personal Information', 'Connect Bank Account', 'Set Financial Goals', 'Review'];
const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>


export const Names = ({ formData, setForm, navigation }) => {

  const mapStateToProps  = (state) => {
        return {
        task:state.status
        }
  };
  
  connect(mapStateToProps,null)(Names);
  const { firstName, lastName, phone,email,birthDay } = formData;
  const [errorfirstName, setErrorfirstName]= React.useState(false);
  const [errorlastName, setErrorLastName]= React.useState(false);
  const [errorphone, setErrorPhone]= React.useState(false);
  const [erroremail, setErrorEmail]= React.useState(false);
  const [errorbirthday, setErrorBirthday]= React.useState(false);
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

 
  const ChangeDay = (event) => {
      console.log(event.target.value);
      formData.birthDay = event.target.value;
  }


  const nextForm = () => {
     if (typeof formData.birthDay === 'undefined') {
      formData.birthDay =materialDateInput;
     }
     console.log(formData.birthDay);
    if (formData.firstName === ''||formData.lastName === '' ||formData.lastName === ''||formData.phone === ''||formData.email === '' ||formData.birthDay === ''  ) {
        if (formData.firstName === ''){
          setErrorfirstName(true);
        }else{
          setErrorfirstName(false);
        }
        if (formData.lastName === ''){
          setErrorLastName(true);
        }else{
          setErrorLastName(false);
        }
        if (formData.phone === ''){
          setErrorPhone(true);
        }else{
          setErrorPhone(false);
        }
        
        if (formData.email === ''){
          setErrorEmail(true);
        }else{
          setErrorEmail(false);
        }
        if (formData.birthDay === ''){
          setErrorBirthday(true);
        }else{
          setErrorBirthday(false);
        }
    }else {
        navigation.next()
    }
   
  };
 
  return (
   
    <Container maxWidth="lg">
      <div  className="wrapper">
      <Stepper activeStep={activeStep}  orientation="vertical" nonLinear={false} >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        <div className="content-right">
        <h3>Personal Information</h3>
        <p className="description">Please enter your information and proceed to the next
step so we can build your accounts.</p>
        <div className="from-group">
        <TextField
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={setForm}
        margin="normal"
        error={errorfirstName}
        helperText={errorfirstName === true ? 'Please fill that field' : ''}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={setForm}
        margin="normal"
        autoComplete="off"
        error={errorlastName}
        helperText={errorlastName === true ? 'Please fill that field' : ''}
      />
      </div>
      <div  className="content-bottom"> 
      <TextField
        label="Your Email"
        name="email"
        type="email"
        value={email}
        onChange={setForm}
        margin="normal"
        error={erroremail}
        helperText={erroremail === true ? 'Please fill that field' : ''}
        fullWidth
      />
      <TextField
        label="Phone Number"
        name="phone"
        type="number"
        value={phone}
        onChange={setForm}
        onInput={e => {
          e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
        }}
        margin="normal"
        error={errorphone}
        helperText={errorphone === true ? 'Please fill that field' : ''}
        fullWidth
      />
             <TextField
    id="date"
    label="Birth Date:"
    type="date"
    value={birthDay}
    onChange={(event) => ChangeDay(event) }
    defaultValue={materialDateInput} 
    error={errorbirthday}
    helperText={errorbirthday === true ? 'Please fill that field' : ''}
    InputLabelProps={{
      shrink: true,
    }}
  />
      </div>
     
      <Button
        variant="contained"
        color="primary"
        onClick={()=>  nextForm()}
      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
        </div>
      </div>
    
     
      
    </Container>
  );
};
