import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
const steps = ['Personal Information', 'Connect Bank Account', 'Set Financial Goals', 'Review'];


const currencies = [
  {
    img: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    title: 'Specific Plan',
    description: 'Pellentesque nec nam aliquam sem et volutpat consequat mauris nunc congue nisi.',
  },
  {
    img: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    title: 'Medium Plan',
    description: 'Pellentesque nec nam aliquam sem et volutpat consequat mauris nunc congue nisi.',
  },
  {
    img: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    title: 'Large Plan',
    description: 'Pellentesque nec nam aliquam sem et volutpat consequat mauris nunc congue nisi.',
  },
];

export const Contact = ({ formData, setForm, navigation }) => {
  const { plan, planDescription } = formData;
  const [activeStep, setActiveStep] = React.useState(2);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleChange = (event,x,y) => {
    formData.plan  =  x;
    formData.planDescription  =  y;
 }

 const nextForm = () => {
  console.log(formData.plan);
  console.log(formData.planDescription);
if ( typeof formData.plan === 'undefined'|| typeof formData.planDescription === 'undefined' ) {
  alert('Choose your plan');
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
        <h3>Set Financial Goals</h3>
        <p className="description">Please enter your information and proceed to the next
step so we can build your accounts.</p>
    
  <div className="custom-card">
  <Card className="card" >      

  {currencies.map((option) => (
           <CardActionArea   onClick={ (event) => handleChange(event, option.title, option.description)  } >
           <CardMedia
             component="img"
             alt="Contemplative Reptile"
             height="140"
             image={option.img}
             title="Contemplative Reptile"
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
             {option.title}
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p">
             {option.description}
             </Typography>
           </CardContent>
         </CardActionArea>
          ))}
      </Card>
      </div>
      
      <div style={{ marginTop: "1rem" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={()=>  nextForm()}
        >
          Next
        </Button>
      </div>
      </div>
      </div>
    </Container>
  );
};
