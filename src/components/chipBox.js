import ChipInput from 'material-ui-chip-input';
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles/styles';

class ChipBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(option) {
    this.state.options.push(option);
  }

  handleDelete(deletedOption) {
    this.setState({
      options: this.state.options.filter(c => c !== deletedOption)
    });
  }

  render() {
    return (
      <ChipInput
        variant={'outlined'}
        value={this.state.options}
        onAdd={option => this.handleAdd(option)}
        onDelete={deletedOption => this.handleDelete(deletedOption)}
        onBlur={event => {
          if (this.props.addOnBlur && event.target.value) {
            this.handleAdd(event.target.value);
          }
        }}
        allowDuplicates={false}
        fullWidth
        label="Team Names"
      />
    );
  }
}

ChipBox.propTypes = { addOnBlur: PropTypes.bool };

export default withStyles(styles)(ChipBox);
