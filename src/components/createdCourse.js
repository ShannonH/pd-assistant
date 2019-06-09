import axios from 'axios';
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { createCourse } from '../api/orchestration';

class CreatedCourse extends Component {
  state = { isLoading: true, courseLink: '' };

  componentDidMount = () => {
    this.setState({ isLoading: true });
    axios
      .post('https://ultra-integ.int.bbpd.io/webapps/login?action=logout')
      .then(response => console.log(response));
    /*createCourse({
      hideCustom: this.props.hideCustom,
      courseId: this.props.courseId,
      courseName: this.props.courseName,
      courseDesc: this.props.courseDesc,
      available: this.props.available,
      type: this.props.type,
      instructorUserId: this.props.instructorUserId,
      studentCount: parseInt(this.props.studentCount),
      learnUrl: this.props.baseUrl,
      adminPassword: this.props.adminPassword,
      adminUsername: this.props.adminUsername
    });*/
    //this.setState({ courseLink: course.externalUrl });
  };

  render() {
    return <div style={{ padding: 24 }}>Winning</div>;
  }
}

CreatedCourse.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseDesc: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  available: PropTypes.string.isRequired,
  instructorUserId: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  adminPassword: PropTypes.string.isRequired,
  adminUsername: PropTypes.string.isRequired,
  hideCustom: PropTypes.bool.isRequired
};

export default CreatedCourse;
