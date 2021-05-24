export default (data) => {
  const domParser = new DOMParser();
  const document = domParser.parseFromString(data, 'application/xml');

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
