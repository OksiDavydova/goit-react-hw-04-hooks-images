import PropTypes from 'prop-types';
import s from './Notification.module.css';

export function Notification({ message }) {
  return <p className={s.message_notification}>{message}</p>;
}

Notification.defaultProps = {
  message: 'No feedback given',
};

Notification.propType = {
  message: PropTypes.string.isRequired,
};
