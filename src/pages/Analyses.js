import {
  Card,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  Link,
  IconButton,
  withStyles
} from '@material-ui/core';
import React, { Component } from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';
import { Delete as DeleteIcon } from '@material-ui/icons';
import classnames from 'classnames';
import { styles } from '../styles/styles';
import { AddFab } from '../components/buttons';
import { asyncFetch } from '../utils/frontEnd';

class Analyses extends Component {
  state = {
    loading: true,
    analyses: []
  };

  componentDidMount() {
    this.getAnalyses();
  }

  async getAnalyses() {
    this.setState({
      loading: false,
      posts: await asyncFetch('get', '/analysis')
    });
  }

  saveAnalysis = async analysis => {
    if (analysis.id) {
      await asyncFetch('put', `/analysis/${analysis.id}`, analysis);
    } else {
      await asyncFetch('post', '/analysis', analysis);
    }

    this.props.history.goBack();
    this.getAnalyses();
  };

  async deletePost(analysis) {
    if (window.confirm(`Are you sure you want to delete "${analysis.title}"`)) {
      await asyncFetch('delete', `/posts/${analysis.id}`);
      this.getAnalyses();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant={'h4'} gutterBottom align={'left'}>
          Risk Analysis Manager
        </Typography>
        {this.state.analyses.length > 0 ? (
          <Paper elevation={1} className={classnames(classes.posts)}>
            <List component={'ul'}>
              {orderBy(
                this.state.analyses,
                ['updatedAt', 'title'],
                ['desc', 'asc']
              ).map(analysis => (
                <ListItem
                  key={analysis.id}
                  button
                  component={Link}
                  to={`/analysis/${analysis.id}`}>
                  <ListItemText
                    primary={analysis.title}
                    secondary={
                      analysis.updatedAt &&
                      `Updated ${moment(analysis.updatedAt).fromNow()}`
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => this.deletePost(analysis)}
                      color='inherit'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && (
            <div>
              <Card style={{ padding: 20, textAlign: 'left' }}>
                <Typography variant='h6' gutterBottom align={'left'}>
                  No analyses to display
                </Typography>
                <Typography variant={'subtitle1'} gutterBottom align={'left'}>
                  To begin using this tool, click the add button below. There
                  are <em>n</em> types of Risk Analysis that can be created:
                </Typography>
                <ul>
                  <li>
                    Traditional - type of analysis done to call out areas of the
                    application that would most benefit from automated UI
                    testing
                  </li>
                  <li>
                    Team Readiness - this type of analysis helps determine if
                    your team is the best and most ready team to take on a
                    project
                  </li>
                  <li>
                    Performance - analyze the kinds of changes being introduced
                    to uncover areas of the application that may require new
                    performance tests to be added to one of our performance
                    suites
                  </li>
                </ul>
              </Card>
            </div>
          )
        )}
        <AddFab href={'/analyses/new'} />
      </div>
    );
  }
}

export default withStyles(styles)(Analyses);
