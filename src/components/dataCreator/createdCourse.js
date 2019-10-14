import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { asyncFetch } from '../../utils/frontEnd';

class CreatedCourse extends Component {
  state = { isLoading: true, courseLink: '' };

  componentDidMount = () => {
    this.setState({ isLoading: true });
    asyncFetch('put', '/createData', {
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
    }).then(course => {
      console.log(course);
      //this.setState({ courseLink: course.externalAccessUrl });
    });
  };

  render() {
    return <div style={{ padding: 24 }}>Your course is done. The URL is</div>;
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
