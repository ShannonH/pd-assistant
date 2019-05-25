import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import { styles } from '../styles/styles';
import Stepper from '@material-ui/core/Stepper/index';
import Step from '@material-ui/core/Step/index';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import LearnEnvStep from '../components/learnEnvStep';
import { CourseSteps } from '../components/coursesStep';
import { UsersBlock } from '../components/usersStep';
import classnames from 'classnames';
import faker from 'faker';

require('@gouch/to-title-case');

const fakerCourseId = faker.internet.password();
const fakerCourseName = faker.company.bs().toTitleCase();
const fakerCourseDesc = faker.lorem.sentences(3);
const fakerInstructorUser = faker.internet.userName();

function getSteps() {
  return [
    'Learn Environment',
    'Course Settings',
    'Create and Enroll Users',
    'Create Content',
    'Finish'
  ];
}

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    available: 'available',
    type: 'ULTRA',
    courseId: fakerCourseId,
    courseName: fakerCourseName,
    courseDesc: fakerCourseDesc,
    instructorUserId: fakerInstructorUser,
    studentCount: 20
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isStepOptional = step => step === 3;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    // noinspection HtmlDeprecatedAttribute
    return (
      <div className={classnames(classes.root)}>
        <Typography variant={'h4'} align={'center'} gutterBottom>
          Data Creator
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel nonLinear>
          {steps.map((label, index) => {
            const props = {};
            const buttonProps = {};
            if (this.isStepOptional(index)) {
              buttonProps.optional = (
                <Typography variant='caption'>Optional</Typography>
              );
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepButton onClick={this.handleStep(index)} {...buttonProps}>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div className={classnames(classes.content)}>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography
                  className={classnames(classes.instructions)}
                  component={'span'}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button
                  onClick={this.handleReset}
                  className={classnames(classes.stepperButton)}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography
                  className={classnames(classes.instructions)}
                  component={'span'}>
                  {
                    {
                      0: <LearnEnvStep />,
                      1: (
                        <CourseSteps
                          courseName={this.state.courseName}
                          courseId={this.state.courseId}
                          courseDesc={this.state.courseDesc}
                          type={this.state.type}
                          available={this.state.available}
                          onChange={this.handleChange}
                        />
                      ),
                      2: (
                        <UsersBlock
                          instructor={this.state.instructorUserId}
                          studentCount={this.state.studentCount}
                          onChange={this.handleChange}
                        />
                      ),
                      3: 'Create Content',
                      4: 'Finish'
                    }[activeStep]
                  }
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classnames(classes.stepperButton)}>
                    Back
                  </Button>
                  {this.isStepOptional(activeStep) && (
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={this.handleSkip}
                      className={classnames(classes.stepperButton)}>
                      Skip
                    </Button>
                  )}
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={this.handleNext}
                    className={classnames(classes.stepperButton)}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalLinearStepper);
