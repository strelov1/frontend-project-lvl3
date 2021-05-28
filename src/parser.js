export default (data) => {
  const domParser = new DOMParser();
  const document = domParser.parseFromString(data, 'application/xml');

  const parseError = document.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsingError = true;
    throw error;
  }

  const channelTitleElement = document.querySelector('title');
  const channelTitle = channelTitleElement.textContent;

  const channelDescriptionElement = document.querySelector('description');
  const channelDescription = channelDescriptionElement.textContent;

  const itemsElements = document.querySelectorAll('item');
  const items = Array.from(itemsElements).map((itemElement) => {
    const itemTitleElement = itemElement.querySelector('title');
    const itemTitle = itemTitleElement.textContent;

    const itemLinkElement = itemElement.querySelector('link');
    const itemLink = itemLinkElement.textContent;

    const itemDescriptionElement = itemElement.querySelector('description');
    const itemDescription = itemDescriptionElement.textContent;

    return {
      title: itemTitle,
      link: itemLink,
      description: itemDescription,
    };
  });

  return {
    title: channelTitle,
    description: channelDescription,
    items,
  };
};
