import {
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
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';
import { Delete as DeleteIcon } from '@material-ui/icons';
import classnames from 'classnames';
import { styles } from '../styles/styles';
import { AddFab } from '../components/buttons';

const API = process.env.REACT_APP_API || 'http://localhost:3001';

class Analyses extends Component {
  state = {
    loading: true,
    analyses: []
  };

  componentDidMount() {
    this.getAnalyses();
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getAnalyses() {
    this.setState({
      loading: false,
      posts: await this.fetch('get', '/analysis')
    });
  }

  saveAnalysis = async analysis => {
    if (analysis.id) {
      await this.fetch('put', `/analysis/${analysis.id}`, analysis);
    } else {
      await this.fetch('post', '/analysis', analysis);
    }

    this.props.history.goBack();
    this.getAnalyses();
  };

  async deletePost(analysis) {
    if (window.confirm(`Are you sure you want to delete "${analysis.title}"`)) {
      await this.fetch('delete', `/posts/${analysis.id}`);
      this.getAnalyses();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant='h5'>Risk Analysis Manager</Typography>
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
              <Typography variant='h6'>No analyses to display</Typography>
            </div>
          )
        )}
        <AddFab href={'/analyses/new'} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(Analyses);
