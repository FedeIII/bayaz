# Remix

This directory is a brief example of a [Remix](https://remix.run/docs) site that can be deployed to Vercel with zero configuration.

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/remix&template=remix)

_Live Example: https://remix-run-template.vercel.app_

You can also deploy using the [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## DB

update local db with new schema

```sh
npx prisma db push
```

get seeds into the local db

```sh
npx prisma db seed
```

create migration file for schema changes

```sh
npx prisma migrate dev
```

## TO DOs
- show weapon attrs on character creation screens
- show npc option in character creation only to DMs
- Change caracteristics once they are assigned
- Racial skills description
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
- Bard:
  - track usages of bardic inspiration
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
