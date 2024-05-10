export default async function processAction(
  action,
  formData,
  actionDefinitions
) {
  const actionDefinition = actionDefinitions[action];

  if (actionDefinition) return await actionDefinition(formData);

  return null;
}
