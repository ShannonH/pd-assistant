import React, { Component } from 'react';
import MyEditor from '../components/editor/editor';
import Paper from '@material-ui/core/Paper';

class RiskAnalysisCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  saveAnalysis = async analysis => {
    if (analysis.id) {
      await this.fetch('put', `/analysis/${analysis.id}`, analysis);
    } else {
      await this.fetch('post', '/analysis', analysis);
    }
    this.props.history.goBack();
  };

  render() {
    return (
      <Paper>
        <MyEditor value={this.state.value} onSave={this.saveAnalysis} />
      </Paper>
    );
  }
}

export default RiskAnalysisCreator;
