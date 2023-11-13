import { useEffect, useState } from 'react';

import {
  getArmorClass,
  getExtraArmorClass,
  getHitDice,
  getMaxHitPoints,
  getRemainingHitDice,
  getSpeed,
} from '~/domain/characters';
import { increment } from '~/domain/display';
import { SkillItem } from '../modal/skillItem';
import DeathSavingThrows from './deathSavingThrows';

import styles from '~/components/indicators/bar.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function CombatAttrs(props) {
  const { pc, skillRefs, openSkillModal, onFreeTextChange, isForPlayers } =
    props;
  const { hitPoints, temporaryHitPoints } = pc;

  const [extraHitPoints, setExtraHitPoints] = useState(null);
  const [hitPointsState, setHitPointsState] = useState(hitPoints);
  const maxHitPoints = getMaxHitPoints(pc);
  const hitPointsStyle =
    hitPointsState < maxHitPoints / 2
      ? hitPointsState < maxHitPoints / 5
        ? 'bar__redBar'
        : 'bar__orangeBar'
      : 'bar__blueBar';

  function animateHitPoints(addExtraHitPoints, i) {
    setTimeout(() => {
      setHitPointsState(hitPoints - addExtraHitPoints + i);
    }, (1000 / addExtraHitPoints) * i + 1000);

    if (addExtraHitPoints === i) return;
    else animateHitPoints(addExtraHitPoints, i + 1);
  }

  function heal(extraHitPoints) {
    setTimeout(() => {
      setExtraHitPoints(null);
    }, 5000);
    setHitPointsState(hitPoints - extraHitPoints);
    setExtraHitPoints(extraHitPoints);
    animateHitPoints(parseInt(extraHitPoints, 10), 0);
  }

  useEffect(() => {
    if (window) {
      const url = new URL(window?.location.href);
      const addExtraHitPoints = url.searchParams.get('addExtraHitPoints');
      if (addExtraHitPoints) {
        heal(addExtraHitPoints);
      }
    }
  }, []);

  useEffect(() => {
    const addExtraHitPoints = hitPoints - hitPointsState;
    if (addExtraHitPoints > 0) {
      heal(addExtraHitPoints);
    }
  }, [hitPoints]);

  return (
    <>
      <div className="sheet__data sheet__armor-class">
        <SkillItem
          ref={skillRefs.ac.current[0]}
          traitName="armorClass"
          trait="Clase de Armadura"
          pc={pc}
          openModal={openSkillModal('ac', 0)}
        >
          {getArmorClass(pc)}
          <span className="sheet__data sheet__extra-armor-class">
            {getExtraArmorClass(pc)
              ? `(${increment(getExtraArmorClass(pc))})`
              : null}
          </span>
        </SkillItem>
      </div>
      <span className="sheet__data sheet__speed">{getSpeed(pc)}m</span>
      <span className="sheet__data sheet__max-hit-points">
        <SkillItem
          ref={skillRefs.hp.current[0]}
          traitName="maxHitPoints"
          trait="Puntos de Golpe máximos"
          pc={pc}
          openModal={openSkillModal('hp', 0)}
        >
          {maxHitPoints}
        </SkillItem>
      </span>
      <span className={`sheet__data sheet__hit-points ${hitPointsStyle}`}>
        {hitPointsState}
        {!!extraHitPoints && (
          <span className="sheet__data sheet__extra-hit-points">
            {increment(extraHitPoints)}
          </span>
        )}
      </span>
      <span className="sheet__data sheet__temporary-hit-points">
        <input
          type="number"
          name="temporaryHitPoints"
          min="0"
          onChange={onFreeTextChange}
          defaultValue={temporaryHitPoints || ''}
          className="sheet__temporary-hit-points-input"
          disabled={isForPlayers}
        />
      </span>

      <span className="sheet__data sheet__hit-dice">{getHitDice(pc)}</span>
      <span className="sheet__data sheet__remaining-hit-dice">
        <SkillItem
          ref={skillRefs.remainingHitDice.current[0]}
          traitName="remainingHitDice"
          trait="Dados de golpe"
          pc={pc}
          openModal={openSkillModal('remainingHitDice', 0)}
          disabled={isForPlayers}
        >
          {getRemainingHitDice(pc)}
        </SkillItem>
      </span>

      <DeathSavingThrows />
    </>
  );
}

export default CombatAttrs;
