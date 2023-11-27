export default function countDateDifference(value) {
  const currentDate = new Date();
  const valueDate = new Date(value);
  const diff = Math.floor((currentDate - valueDate) / 1000);

  const intervals = {
    year: diff / 31536000,
    month: diff / 2592000,
    week: diff / 604800,
    day: diff / 86400,
    hour: diff / 3600,
    minute: diff / 60,
  };

  if (intervals.year > 1) {
    const years = Math.floor(intervals.year);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
  else if (intervals.month > 1) {
    const months = Math.floor(intervals.month);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  else if (intervals.week > 1) {
    const weeks = Math.floor(intervals.week);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  else if (intervals.day > 1) {
    const days = Math.floor(intervals.day);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  else if (intervals.hour > 1) {
    const hours = Math.floor(intervals.hour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  else if (intervals.minute >= 6 && intervals.minute <= 60) {
    const minutes = Math.floor(intervals.minute);
    return `${minutes} minutes ago`;
  }
  else {
    return 'Few minutes ago';
  }
};
