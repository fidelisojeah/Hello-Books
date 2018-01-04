import moment from 'moment';


const getMoment = dateDetails =>
  moment(dateDetails).fromNow();

const displayDate = dateDetails =>
  moment(dateDetails).format('Do MMM YYYY');

const displayYear = dateDetails =>
  moment(dateDetails).format('YYYY');
const todayDate = () => moment();

const forBookModal = () => {
  return {
    maxDate: moment().add(60, 'days'),
    minDate: moment().add(1, 'days')
  };
};

export {
  getMoment,
  displayDate,
  displayYear,
  todayDate,
  forBookModal
};
