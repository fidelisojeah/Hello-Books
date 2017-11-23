import moment from 'moment';


const getMoment = dateDetails =>
  moment(dateDetails).fromNow();

const displayDate = dateDetails =>
  moment(dateDetails).format('Do MMM YYYY');

const displayYear = dateDetails =>
  moment(dateDetails).format('YYYY');
const todayDate = () => moment();

export {
  getMoment,
  displayDate,
  displayYear,
  todayDate
};
