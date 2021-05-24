import * as yup from 'yup';

const validateSchema = (value) => {
  const inputSchema = yup.string().url().required();
  try {
    inputSchema.validateSync(value);
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

const validateUrl = (value, feeds) => {
  if (!validateSchema(value)) {
    return [true, 'Ссылка должна быть валидным URL'];
  }

  if (feeds.map(({ url }) => url).includes(value)) {
    return [true, 'RSS уже существует'];
  }

  return [false, null];
};

export default validateUrl;
