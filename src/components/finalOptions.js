import Typography from '@material-ui/core/Typography';
import React from 'react';

function FinalOptions(props) {
  // noinspection HtmlDeprecatedAttribute
  return (
    <div>
      <Typography
        variant={'h5'}
        component={'div'}
        gutterBottom
        align={'center'}>
        Here are the selections you've made. If they're correct, click Finish to
        create the course.
      </Typography>
      <br/>
      <Typography variant={'h6'} component={'div'} gutterBottom>
        Course Name: {props.courseName}
        <br/>
        Course Id: {props.courseId}
        <br/>
        <div style={{ paddingLeft: 22, textIndent: -22 }}>
          Course Description: {props.courseDesc}
        </div>
        Course Type: {props.type}
        <br/>
        Course Availability: {props.available}
        <br/>
        Instructor Username: {props.instructor}
        <br/>
        Number of Students: {props.studentCount}
        <br/>
        {props.testCount > 0 ? (
          <div>
            Number of Tests: {props.testCount}
            <br/>
          </div>
        ) : null}
        {props.assignmentCount > 0 ? (
          <div>
            Number of Assignments: {props.assignmentCount}
            <br/>
          </div>
        ) : null}
        {props.discussionCount > 0 ? (
          <div>
            Number of Discussions: {props.discussionCount}
            <br/>
          </div>
        ) : null}
        {props.documentCount > 0 ? (
          <div>
            Number of Documents: {props.documentCount}
            <br/>
          </div>
        ) : null}
        {props.fileCount > 0 ? (
          <div>
            Number of Files: {props.fileCount}
            <br/>
          </div>
        ) : null}
        {props.finalUrl !== '' ? (
          <div>This will be created on {props.finalUrl}</div>
        ) : (
          <div style={{ color: 'red' }}>
            You need to choose a Learn Environment in Step 1!
          </div>
        )}
      </Typography>
    </div>
  );
}

export default FinalOptions;
