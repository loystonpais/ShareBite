import { format, parseISO } from 'date-fns';

// If your date string is in ISO format (e.g., "2025-08-16T00:00:00.000Z")
const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, 'MMM dd yyyy');
};

export { formatDate };