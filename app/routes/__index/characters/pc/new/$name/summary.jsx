import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';

import styles from '~/components/characters.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

function PcSummary() {
  const { pc } = useLoaderData();
  const { age, pClass, height, name, race, size, speed, subrace, weight } = pc;

  return (
    <div className={styles.summary}>
      <h2>{name}</h2>
    </div>
  );
}

export default PcSummary;
