export default (data) => {
  const domParser = new DOMParser();
  const document = domParser.parseFromString(data, 'application/xml');

  const parseError = document.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    throw error;
  }

  return {
    title: document.querySelector('title')?.textContent,
    description: document.querySelector('description')?.textContent,
    items: Array.from(document.querySelectorAll('item')).map((itemNode) => ({
      title: itemNode.querySelector('title')?.textContent,
      link: itemNode.querySelector('link')?.textContent,
      description: itemNode.querySelector('description')?.textContent,
    })),
  };
};
