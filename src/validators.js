import * as yup from 'yup';

export default (value, feeds) => {
  const inputSchema = yup
    .string()
    .url()
    .required()
    .test('already_exist', 'This feeds already exist', (validateValue) => !feeds.map(({ url }) => url).includes(validateValue));

  try {
    inputSchema.validateSync(value);
  } catch (error) {
    console.warn(error);
    return error.message;
  }
  return '';
};
