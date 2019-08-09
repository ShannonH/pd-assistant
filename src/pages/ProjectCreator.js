import React, { Component } from 'react';
import {
  withStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from '@material-ui/core';
import { styles } from '../styles/styles';
import ProjectOverview from '../components/projectCreator/projectOverview';
import ProjectLinktoTeam from '../components/projectCreator/projectLinkToTeam';
import ProjectRequirements from '../components/projectCreator/projectRequirements';
import classnames from 'classnames';
import { asyncFetch } from '../utils/frontEnd';

function getSteps() {
  return [
    'Describe the project',
    'Link the project to a scrum team',
    'Choose interactions',
    'List requirements'
  ];
}

class ProjectCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      projectName: 'New Project',
      projectDpLink: '',
      projectDescription: '',
      teamsList: [],
      projectTeam: {},
      integrations: [],
      requirements: [],
      requirement: ''
    };
  }

  componentDidMount() {
    this.getTeamsList();
  }

  getTeamsList() {
    asyncFetch('get', '/teams').then(result =>
      this.setState({ teamsList: result })
    );
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTeamChange = e => {
    this.setState({ projectTeam: e.target.value });
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      projectName: '',
      projectDpLink: '',
      projectDescription: ''
    });
  };

  handleNewRequirement = e => {
    this.state.requirements.push(this.state.requirement);
    this.setState({ requirement: '' });
    console.log(this.state);
  };

  handleDeleteRequirement = e => {};

  createProject = async () => {
    await asyncFetch('post', '/projects', {
      dpNumber: this.state.projectDpLink,
      description: this.state.projectDescription,
      name: this.state.projectName,
      teamId: this.state.projectTeam.id,
      userId: this.props.userId
    });
  };

  render() {
    const classes = this.props;
    const steps = getSteps();

    return (
      <div className={classnames(classes.root)}>
        <Typography variant={'h4'} gutterBottom>
          {this.state.projectName}
        </Typography>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classnames(classes.instructions)}>
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography
                className={classnames(classes.instructions)}
                style={{ padding: 20 }}
                component={'div'}>
                {
                  {
                    0: (
                      <ProjectOverview
                        projectName={this.state.projectName}
                        projectDpLink={this.state.projectDpLink}
                        projectDescription={this.state.projectDescription}
                        onChange={this.handleChange}
                      />
                    ),
                    1: (
                      <ProjectLinktoTeam
                        teamsList={this.state.teamsList}
                        selectedTeam={this.state.projectTeam}
                        onChange={this.handleTeamChange}
                      />
                    ),
                    2: 'Integrations page',
                    3: (
                      <ProjectRequirements
                        addRequirement={this.handleNewRequirement}
                        requirement={this.state.requirement}
                        requirements={this.state.requirements}
                        onChange={this.handleChange}
                      />
                    )
                  }[this.state.activeStep]
                }
              </Typography>
              <div>
                <Button
                  style={{ margin: 10 }}
                  disabled={this.state.activeStep === 0}
                  onClick={this.handleBack}
                  className={classnames(classes.backButton)}>
                  Back
                </Button>
                {this.state.activeStep === steps.length - 1 ? (
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={this.createProject}>
                    Finish
                  </Button>
                ) : (
                  <Button
                    style={{ margin: 10 }}
                    variant={'outlined'}
                    color={'secondary'}
                    onClick={this.handleNext}>
                    {' '}
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProjectCreator);
