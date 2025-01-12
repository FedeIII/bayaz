## Tools

### Tile the map:

`gdal2tiles -p 'raster' --zoom=2-8 --s_srs EPSG:6576 --xyz map_raw.png tiles`

## Versions

- **v0.2.0:**
  - remix 2.15.0
  - leaflet and react-leaflet as npm libraries
  - regions stored as group of points for cells

- **v0.1.0:**
  - first alpha release
  - remix 1.19.3
  - leaflet and react-leaflet as local libraries
  - regions stored like polygons

## TO DOs

- In combats, add spells of mobs in notes
- Add quick npcs to combats
- Spell lists: make them one single column when number < X
- "Ligera" translation: conflict between the armor and the spell
- Review bigModal prop
- Move Regions to canvas
- Rules searcher:
  - Conditions
- Review Npcs combat (monstersCombat uses mobs + npcs)
- Autofill Dominion and Subdominion when creating a settlement from the map
- Save last position in the map
- Remove magic-items and deps
- Extract textarea component
- Add notes to items
- Add temporary hitpoints to combats
- Warlock's Eldritch Invocations can be swapped every level
- Fix padding left at spell selection
- Allow to set max health for mobs in new encounters
- Notes revamp
- Add notes to npcs
- Save quick npcs
- Embedded youtube music
- Unlink encounters from parties
  - Random encounters fix
- Combat menu
- Buildings in settlements
- Characters in places
- Audio in places
- id for NPCs
- Review more player options in sheets
- Background: {trait}
- put hit dice roll on level up in the modal
- bug: when a party is active, selecting a PC outside the party ends up bugging the menu
- Ranger:
  - choose companion
- Fighter:
  - track superiority dice consumption
- Sorcerer:
  - Sorcery Points / spell slots tracker
- Wizard
  - arcaneRecovery interaction button to update spells
  - spellMastery select spells
  - signatureSpells select spells
- Monk
  - track Ki points
- Improve spell modal data
- Free text annotations anywhere in the character sheets (other colors)
- deduplicate items in item proficiencies and in treasure inventory
- Bardic Inspiration die
- Gain extra HP (con and others) on level up
- no env monsters without details and/or translations
- Some class skills can be piled up if you go back and forth in the browser navigation
- Conditions for equiped items
- When equipping a weapon from the summary screen, the correct slot is not used

## GUIDES
### SpendTrait
Shows and manages remaining uses of a trait or feat
- In trait explanation add to the end:
    ```jsx
    <SpendTrait
      pc={pc}
      traitName="traitName"
      submit={submit}
      traitGetter={getTraitName}
      openModal={openModal}
    />
    ```
- In the Pc Schema, add the trait as `traitName` under a `context` (like `classAttrs` or `feats`)
    ```js
      const featsSchema = new mongoose.Schema({
        ...
        traitName: Number,
      });
    ```
- Create the trait actions in the explanation file (for example `featsExplanation.jsx`):
    ```js
    export const featsActions = {
      ...createSpendActions('feats', 'traitName'),
    };
    ```
- Initialize the trait with its max value. For example in the class initialization file (`characters.pc.new.$id.class.jsx`), or the trait selection file (`characters.pc.new.$id.leveling.abilityScoreImprovement/route.jsx`)
- Reset the trait value on short or long rest (in `characterMutations.js`)
