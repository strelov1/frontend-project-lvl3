import * as yup from 'yup';

const inputSchema = yup.string().url().required();

const validateUrl = (value, feeds) => {
  try {
    inputSchema.validateSync(value);
  } catch (error) {
    return [true, `Ссылка должна быть валидным URL`];
  }

  if (feeds.includes(value)) {
    return [true, `RSS уже существует`];
  }

  return [false, null];
};

export default validateUrl;
