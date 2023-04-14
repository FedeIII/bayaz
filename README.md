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

- Background: {trait}
- lose HP on combats
- recover HP after rest
- recover spell slots after rest
  - Warlock eldritchMaster
- Use spells (consume slots)
- put hit dice roll on level up in the modal
- show all extra stat points in the improve stat screen
- Ranger:
  - show fighting style bonus on weapons
  - choose companion
- Bard:
  - track usages of bardic inspiration
- Fighter:
  - track superiority dice consumption
- Improve spell modal data
- PC screens sharable for players with annotations (in modal and/or inline)
- Death saving throws
- Temporary HP (just edit manually)
- Attack bonus breakdown for weapons
- 2x Weapons not showing in the weapons section
- Copy random spells on the Book:
  - Warlock bookOfAncientSecrets
  - Wizard
- Profiles:
  - User: restrict access to generation screens
  - Admin: add super powers to edit values
- deduplicate items in item proficiencies and in treasure inventory
- Bardic Inspiration die
- Gain extra HP (con and others) on level up
- no env monsters without details and/or translations
- Some class skills can be piled up if you go back and forth in the browser navigation
- Conditions for equiped items
