import * as yup from "yup";

const inputSchema = yup.string().required();

export const validateInput = (value) => {
  try {
    inputSchema.validateSync(value);
    return;
  } catch (error) {
    return error.message;
  }
  return;
};
