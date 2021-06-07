import React from "react";
import Container from '@material-ui/core/Container';
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
const steps = ['Personal Information', 'Connect Bank Account', 'Set Financial Goals', 'Review'];

export const Review = ({ formData, navigation }) => {
  const { go } = navigation;
  const {
    firstName,
    lastName,
    birthDay,
    card,
    bank,
    phone,
    plan,
    planDescription,
    email,
  } = formData;

  const [activeStep, setActiveStep] = React.useState(3);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  
  return (
    <Container maxWidth="lg">
       <div  className="wrapper review-block">
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
        <h3>Review</h3>
        <p className="description">Please enter your information and proceed to the next
step so we can build your accounts.</p>
    
      <RenderAccordion summary="Personal Information" go={ go }  view="Names" details={[
        { 'First Name': firstName },
        { 'Last Name': lastName },
        { 'Your Email': email },
        { 'Phone Number': phone },
        { 'Birth Date:': birthDay },
      ]} />
      <RenderAccordion summary="Connect Bank Account" go={ go }  view="Address" details={[
        { 'Select Bank': bank },
        { 'Number Card': card },
      ]} />
      <RenderAccordion summary="Set Financial Goals" go={ go }  view="Contact"  details={[
        {'': plan},
        { '':planDescription },
      ]} />

      </div>
      </div>
    </Container>
  );
};

export const RenderAccordion = ({ summary, details, go,view }) => (
  <div className= {summary === "Personal Information" ? 'review-frist review' : 'review'}>
    <h2>{summary}</h2>
    <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${view.toLowerCase()}`)}
        ><EditIcon /></IconButton>
    <div className="content-accordion">
        { details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return (
                <div className="content-review" key={index} >
                    <h4>{`${objKey}`}</h4>
                    <p>{`${objValue}`}</p>
                  </div>
          )
        })}
    </div>
    </div>
)
