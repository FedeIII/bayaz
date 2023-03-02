import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';

import { getParty, getPc } from '~/services/pc.server';
import { translateClass, translateRace } from '~/domain/characters';

import styles from '~/components/party.module.css';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs });
};

export const action = async ({ request }) => {
  // const formData = await request.formData();
  // const name = formData.get('name');
  // const pClass = formData.get('pClass');
  // const packName = formData.get('pack');

  // const equipment = getEquipmentComboData({
  //   formData,
  //   numberOfEquipmentOptions: CLASS_EQUIPMENT[pClass].length,
  //   otherInputNames: ['items'],
  // });

  // const pc = await getPc(name);

  // await updatePc({
  //   name,
  //   items: distributeItems(pc, equipment),
  //   pack: packName,
  // });

  return redirect(`/characters/pc/${name}/summary`);
};

function PartyInfo() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  useAddMenuItems('/party', [
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 1 },
  ]);

  return (
    <Form method="post">
      <h2>Party</h2>

      <div className={styles.partySection}>
        Miembros:
        <ul className={styles.partyMembersList}>
          {pcs.map(pc => (
            <li className={styles.character} key={pc.name}>
              <Link
                to={`/characters/pc/${pc.name}/summary`}
                className={styles.partyLink}
              >
                <div className={styles.characterName}>{pc.name}</div>
                <div className={styles.partyData}>
                  {translateRace(pc.race)}
                  {pc.subrace !== 'subrace' &&
                    ` - ${translateRace(pc.subrace)}`}
                </div>
                <div className={styles.partyData}>
                  {translateClass(pc.pClass)}
                </div>
                <div className={styles.partyData}>Nivel {pc.level}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Form>
  );
}

export default PartyInfo;
