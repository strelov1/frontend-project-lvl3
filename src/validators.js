import * as yup from 'yup';

export default (value, feed) => {
  const inputSchema = yup
    .string()
    .url()
    .required()
    .notOneOf(feed.map(({url}) => url));

  try {
    inputSchema.validateSync(value);
  } catch (error) {
    return error.message;
  }
  return '';
};
