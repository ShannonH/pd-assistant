import React from 'react';
import * as dateFns from 'date-fns';
import '../styles/calendarStyles.css';
import { Card } from '@material-ui/core';
import { getEvents } from '../api/GraphService';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../styles/styles';
import classNames from 'classnames';

const EventCard = props => {
  return (
    <Card raised style={{ width: '70%', margin: 15 }} component={'button'}>
      Event: {props.eventName}
    </Card>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      currentMonth: new Date(),
      selectedDate: new Date()
    };
  }

  renderHeader() {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className='header row flex-middle'>
        <div className='col col-start'>
          <div className='icon' onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className='col col-center'>
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className='col col-end' onClick={this.nextMonth}>
          <div className='icon'>chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = 'eeee';
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className='days row'>{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
            <EventCard eventName={'Test Event'} />
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  }

  onDateClick = day => {
    console.log(day);
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  async componentDidMount() {
    // Get the user's access token
    const accessToken = await window.msal.acquireTokenSilent({
      scopes: ['user.read']
    });
    // Get the user's events and push them into state
    await getEvents(accessToken).then(events =>
      events.value.forEach(event =>
        this.state.events.push({
          event: {
            id: event.id,
            subject: event.subject,
            start: event.start.dateTime,
            end: event.end.dateTime,
            organizer: event.organizer.emailAddress.name
          }
        })
      )
    );
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.paperSheet2, 'calendar')}>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

/*render() {
    return (
      <div>
        <h1>Calendar</h1>
        <Table>
          <thead>
            <tr>
              <th scope='col'>Organizer</th>
              <th scope='col'>Subject</th>
              <th scope='col'>Start</th>
              <th scope='col'>End</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map(function(event) {
              return (
                <tr key={event.id}>
                  <td>{event.organizer.emailAddress.name}</td>
                  <td>{event.subject}</td>
                  <td>{formatDateTime(event.start.dateTime)}</td>
                  <td>{formatDateTime(event.end.dateTime)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}*/

export default withStyles(styles)(Calendar);
