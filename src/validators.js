import * as yup from 'yup';

const inputSchema = yup.string().url().required();

const validateInput = (value) => {
  try {
    inputSchema.validateSync(value);
  } catch (error) {
    return `${error.message}: ${value}`;
  }
  return null;
};

export default validateInput;
