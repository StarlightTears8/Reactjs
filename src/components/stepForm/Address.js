import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const steps = ['Personal Information', 'Connect Bank Account', 'Set Financial Goals', 'Review'];
const currencies = [
  {
    value: 'OCBC Bank',
    label: 'OCBC Bank',
  },
  {
    value: 'VietcomBank',
    label: 'VietcomBank',
  },
  {
    value: 'Techcombank',
    label: 'Techcombank',
  },
  {
    value: 'Vnbank',
    label: 'Vnbank',
  },
];
export const Address = ({ formData, setForm, navigation }) => {
  const { card ,bank} = formData;
  const [activeStep, setActiveStep] = React.useState(1);
  const [errorbank, setErrorBank]= React.useState(false);
  const [errorcard, setErrorCard]= React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const nextForm = () => {
      if (typeof formData.bank === 'undefined') {
        formData.bank = 'OCBC Bank';
      }
    if ( typeof formData.card === 'undefined' ) {
    
        if (typeof formData.card === 'undefined' ||formData.card === '' ||  formData.card.length  >12  ){
          setErrorCard(true);
        }else{
          setErrorCard(false);
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
        <h3>Connect Bank Account</h3>
        <p className="description">Please enter your information and proceed to the next
step so we can build your accounts.</p>
        <div  class="content-step">
        <InputLabel id="demo-controlled-open-select-label">Select Bank</InputLabel>
         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Ban"
          name="bank"
          defaultValue="OCBC Bank"
          error={errorbank}
          helperText={errorbank === true ? 'Please fill that field' : ''}
          value={bank}
          onChange={setForm}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
         
        </Select>
    
      <TextField
        label="Number card"
        name="card"
        type="number"
        value={card}
        onChange={setForm}
        margin="normal"
        onInput={e => {
          e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12);
        }}
        error={errorcard}
        helperText={errorcard === true ? 'Please check that field' : ''}
        autoComplete="off"
        fullWidth
      />
        </div>
    
      <div style={{ marginTop: "1rem" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={()=>  nextForm()}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
      </div>
      </div>
    </Container>
  );
};
