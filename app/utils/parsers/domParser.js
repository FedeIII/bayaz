export function isValidHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  if (doc.querySelector('parsererror')) {
    return false;
  }

  const hasHtmlElements = Array.from(doc.body.childNodes).some(
    node => node.nodeType === Node.ELEMENT_NODE
  );

  return hasHtmlElements;
}
