import * as yup from 'yup';

const inputSchema = yup.string().required();

const validateInput = (value) => {
  try {
    inputSchema.validateSync(value);
  } catch (error) {
    return error.message;
  }
  return null;
};

export default validateInput;
