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

import styles from '~/components/sheet.module.css';
import barStyles from '~/components/indicators/bar.module.css';
import DeathSavingThrows from './deathSavingThrows';

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
        ? barStyles.redBar
        : barStyles.orangeBar
      : barStyles.blueBar;

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
      <div className={`${styles.data} ${styles.armorClass}`}>
        <SkillItem
          ref={skillRefs.ac.current[0]}
          traitName="armorClass"
          trait="Clase de Armadura"
          pc={pc}
          openModal={openSkillModal('ac', 0)}
        >
          {getArmorClass(pc)}
          <span className={`${styles.data} ${styles.extraArmorClass}`}>
            {getExtraArmorClass(pc)
              ? `(${increment(getExtraArmorClass(pc))})`
              : null}
          </span>
        </SkillItem>
      </div>
      <span className={`${styles.data} ${styles.speed}`}>{getSpeed(pc)}m</span>
      <span className={`${styles.data} ${styles.maxHitPoints}`}>
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
      <span className={`${styles.data} ${styles.hitPoints} ${hitPointsStyle}`}>
        {hitPointsState}
        {!!extraHitPoints && (
          <span className={`${styles.data} ${styles.extraHitPoints}`}>
            {increment(extraHitPoints)}
          </span>
        )}
      </span>
      <span className={`${styles.data} ${styles.temporaryHitPoints}`}>
        <input
          type="number"
          name="temporaryHitPoints"
          min="0"
          onChange={onFreeTextChange}
          defaultValue={temporaryHitPoints || ''}
          className={styles.temporaryHitPointsInput}
          disabled={isForPlayers}
        />
      </span>

      <span className={`${styles.data} ${styles.hitDice}`}>
        {getHitDice(pc)}
      </span>
      <span className={`${styles.data} ${styles.remainingHitDice}`}>
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
