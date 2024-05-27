export function getChildrenText(text, reactNode) {
  return reactNode?.props
    ? Array.isArray(reactNode.props.children)
      ? reactNode.props.children.reduce(getChildrenText, text)
      : text + reactNode.props.children
    : text + reactNode;
}
