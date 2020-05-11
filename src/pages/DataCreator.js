import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import { styles } from '../styles/styles';
import Stepper from '@material-ui/core/Stepper/index';
import Step from '@material-ui/core/Step/index';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import { LearnEnvStep } from '../components/dataCreator/learnEnvStep';
import { CourseSteps } from '../components/dataCreator/coursesStep';
import { UsersBlock } from '../components/dataCreator/usersStep';
import { ContentSelect } from '../components/dataCreator/contentStep';
import CreatedCourse from '../components/dataCreator/createdCourse';
import FinalOptions from '../components/dataCreator/finalOptions';
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

class DataCreator extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    learnUrl: 'ultra-integ',
    hideCustom: true,
    adminUsername: '',
    adminPassword: '',
    available: 'Enabled',
    type: 'ULTRA',
    courseId: fakerCourseId,
    courseName: fakerCourseName,
    courseDesc: fakerCourseDesc,
    instructorUserId: fakerInstructorUser,
    studentCount: 20,
    testCount: 0,
    assignmentCount: 0,
    documentCount: 0,
    discussionCount: 0,
    fileCount: 0
  };

  handleChange = event => {
    if (event.target.value === 'Other' && event.target.name === 'learnUrl') {
      this.setState({ hideCustom: false });
      if (event.target.name === 'learnUrl' && event.target.value !== 'Other') {
        this.setState({ learnUrl: event.target.value });
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ hideCustom: true });
      }
    }
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
      activeStep: 0,
      skipped: new Set(),
      learnUrl: '',
      hideCustom: true,
      adminUsername: '',
      adminPassword: '',
      available: 'Enabled',
      type: 'ULTRA',
      courseId: fakerCourseId,
      courseName: fakerCourseName,
      courseDesc: fakerCourseDesc,
      instructorUserId: fakerInstructorUser,
      studentCount: 20,
      testCount: 0,
      assignmentCount: 0,
      documentCount: 0,
      discussionCount: 0,
      fileCount: 0
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

    return (
      <div>
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
                <CreatedCourse
                  hideCustom={this.state.hideCustom}
                  courseName={this.state.courseName}
                  courseId={this.state.courseId}
                  courseDesc={this.state.courseDesc}
                  available={this.state.available}
                  type={this.state.type}
                  instructorUserId={this.state.instructorUserId}
                  studentCount={this.state.studentCount}
                  baseUrl={this.state.learnUrl}
                  adminPassword={this.state.adminPassword}
                  adminUsername={this.state.adminUsername}
                />
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
                  component={'div'}>
                  {
                    {
                      0: (
                        <LearnEnvStep
                          learnUrl={this.state.learnUrl}
                          adminUsername={this.state.adminUsername}
                          adminPassword={this.state.adminPassword}
                          onChange={this.handleChange}
                          hidden={this.state.hideCustom}
                        />
                      ),
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
                      3: (
                        <ContentSelect
                          onChange={this.handleChange}
                          testCount={this.state.testCount}
                          assignmentCount={this.state.assignmentCount}
                          documentCount={this.state.documentCount}
                          discussionCount={this.state.discussionCount}
                          fileCount={this.state.fileCount}
                        />
                      ),
                      4: (
                        <div
                          style={{
                            textAlign: 'left',
                            paddingLeft: 150,
                            paddingRight: 150,
                            paddingBottom: 30
                          }}>
                          <FinalOptions
                            learnUrl={this.state.learnUrl}
                            courseName={this.state.courseName}
                            courseId={this.state.courseId}
                            courseDesc={this.state.courseDesc}
                            type={this.state.type.toLowerCase().toTitleCase()}
                            available={this.state.available.toTitleCase()}
                            instructor={this.state.instructorUserId}
                            studentCount={this.state.studentCount}
                            testCount={this.state.testCount}
                            assignmentCount={this.state.assignmentCount}
                            documentCount={this.state.documentCount}
                            discussionCount={this.state.discussionCount}
                            fileCount={this.state.fileCount}
                          />
                        </div>
                      )
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
                    color='primary'
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

DataCreator.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(DataCreator);
