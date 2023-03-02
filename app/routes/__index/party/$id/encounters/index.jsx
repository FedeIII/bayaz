import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getParty, getPc } from '~/services/pc.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';

import styles from '~/components/party.module.css';
import menuStyles from '~/components/menus.module.css';

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

function PartyEncounters() {
  const { party, pcs } = useLoaderData();
  const { id } = party;

  useAddMenuItems('/party', [
    { name: 'Encuentros', url: `/party/${id}/encounters`, level: 1 },
  ]);

  return (
    <>
      <Link to="random" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Encuentro aleatorio</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
    </>
  );
}

export default PartyEncounters;
