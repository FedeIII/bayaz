import { Link } from '@remix-run/react';
import { useContext } from 'react';
import styles from '~/components/app.module.css';
import MenuContext from '~/components/contexts/menuContext';
import MonstersContext from '~/components/contexts/monstersContext';
import PartyContext from '~/components/contexts/partyContext';

const mainLinks = [
  { name: 'Dados', url: '/dice', level: 0 },
  { name: 'Lugares', url: '/places', level: 0 },
  { name: 'Personajes', url: '/characters', level: 0 },
  { name: 'Enemigos', url: '/enemies', level: 0 },
  { name: 'Party', url: '/party', level: 0 },
];
function getMenuItems(partyContext = {}, monsterContext = {}) {
  const { partyIdState } = partyContext;
  const { encounterIdState } = monsterContext;
  const items = [...mainLinks];

  if (partyIdState) {
    items.push(
      { name: partyIdState, url: `/party/${partyIdState}`, level: 1 },
      {
        name: 'Encuentros',
        url: `/party/${partyIdState}/encounters`,
        level: 2,
      }
    );
  }

  if (partyIdState && encounterIdState) {
    items.push({
      name: 'Combate',
      url: `/party/${partyIdState}/encounters/${encounterIdState}`,
      level: 2,
    });
  }

  return items;
}
export function SideBar() {
  const menuContext = useContext(MenuContext) || {};
  const partyContext = useContext(PartyContext) || {};
  const monsterContext = useContext(MonstersContext) || {};
  const { hasMenu } = menuContext;

  const menuItems = getMenuItems(partyContext, monsterContext);

  if (!hasMenu)
    return null;

  return (
    <div className={styles.sidebar}>
      {menuItems.map(button => (
        <Link
          to={button.url}
          className={`${button.level === 0
              ? styles.mainButton
              : button.level === 1
                ? styles.secondaryButton
                : styles.tertiaryButton}`}
          key={button.url}
        >
          {button.name}
        </Link>
      ))}
    </div>
  );
}
