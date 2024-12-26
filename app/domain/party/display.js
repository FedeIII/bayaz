export function groupPartyImages(party) {
  return party.images.reduce((acc, image) => {
    const type = ['city', 'town', 'village', 'settlement'].includes(image.type)
      ? 'settlement'
      : image.type;
    acc[type] = acc[type] || [];
    acc[type].push(image);
    return acc;
  }, {});
}
