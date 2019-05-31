import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { createCourse } from '../api/orchestration';

class CreatedCourse extends Component {
  state = { isLoading: true, courseLink: '' };

  componentDidMount() {
    this.setState({ isLoading: true });
    createCourse({
      hideCustom: this.props.hideCustom,
      courseId: this.props.courseId,
      courseName: this.props.courseName,
      courseDesc: this.props.courseDesc,
      available: this.props.available,
      type: this.props.type,
      instructorUserId: this.props.instructorUserId,
      studentCount: this.props.studentCount,
      baseUrl: this.props.baseUrl,
      adminPassword: this.props.adminPassword,
      adminUsername: this.props.adminUsername
    });
    //this.setState({ courseLink: course.externalUrl });
  }

  render() {
    return <div>Winning</div>;
  }
}

CreatedCourse.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseDesc: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  available: PropTypes.string.isRequired,
  instructorUserId: PropTypes.string.isRequired,
  studentCount: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
  adminPassword: PropTypes.string.isRequired,
  adminUsername: PropTypes.string.isRequired,
  hideCustom: PropTypes.bool.isRequired
};

export default CreatedCourse;
