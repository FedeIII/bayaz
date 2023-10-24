import { useState } from 'react';
import { CLASSES, getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/modal/inventoryItem.module.css';
import appStyles from '~/components/app.module.css';

function HitDiceActions(props) {
  const { skill, pc, submit, closeModal } = props;
  const { pClass, remainingHitDice, hitDice } = pc;

  function onVirtualDieClick() {
    closeModal();
    submit(
      {
        action: 'spendHitDie',
        name: pc.name,
        diceAmount: amountOfDice,
      },
      { method: 'post' }
    );
  }

  function onRealDieClick() {
    closeModal();
    submit(
      {
        action: 'spendRealHitDie',
        name: pc.name,
        die: realDie,
        diceAmount: amountOfDice,
      },
      { method: 'post' }
    );
  }

  function onLongRestClick() {
    closeModal();
    submit(
      {
        action: 'longRest',
        name: pc.name,
      },
      { method: 'post' }
    );
  }

  const [realDie, setRealDie] = useState(null);
  const [amountOfDice, setAmountOfDice] = useState(1);
  const [action, setAction] = useState('');

  const extraConHp = amountOfDice * getStatMod(getStat(pc, 'con'));
  const hpRecoveredNotation = `${amountOfDice}${CLASSES[pClass].hitDice.slice(
    1
  )} ${increment(extraConHp)}`;

  const hitDiceRecoveredForLongRest =
    hitDice / 2 >= 1 ? Math.floor(hitDice / 2) : 1;

  return (
    <div className={styles.hpContainer}>
      <div className={styles.modalButtonsColumn}>
        <h3 className={styles.modalContentTitle}>Acción</h3>
        <label htmlFor="isRealDice" className={appStyles.inputButtonRow}>
          <select
            name="isRealDice"
            id="isRealDice"
            value={action}
            onChange={e => setAction(e.target.value)}
          >
            <option value=""></option>
            <option value="virtualDice">Descanso corto</option>
            <option value="realDice">Descanso corto (dados reales)</option>
            <option value="longRest">Descanso prolongado</option>
          </select>
        </label>
        {['virtualDice', 'realDice'].includes(action) && (
          <label htmlFor="diceAmount" className={appStyles.inputButtonRow}>
            <span>Gastar</span>{' '}
            <input
              type="number"
              id="diceAmount"
              name="diceAmount"
              onKeydown="return false"
              max={remainingHitDice}
              min="1"
              value={amountOfDice}
              onChange={e => setAmountOfDice(e.target.value)}
              className={`${styles.modalInput} ${styles.modalInputSmall}`}
            />{' '}
            <span>dado{amountOfDice > 1 ? 's' : ''}:</span>
          </label>
        )}
        {action === 'virtualDice' && (
          <label htmlFor="virtualDie" className={appStyles.inputButtonRow}>
            <button
              type="button"
              id="virtualDie"
              className={styles.modalButton}
              onClick={onVirtualDieClick}
            >
              Tirar {hpRecoveredNotation}
            </button>
          </label>
        )}
        {action === 'realDice' && (
          <label htmlFor="realDie" className={appStyles.inputButtonColumn}>
            <div className={appStyles.inputWithTag}>
              <span>Valor de los dados:</span>{' '}
              <input
                type="number"
                id="realDie"
                name="hitPointsRealDie"
                onKeydown="return false"
                min="1"
                value={realDie}
                onChange={e => setRealDie(e.target.value)}
                className={`${styles.modalInput} ${styles.modalInputSmall}`}
              />
            </div>
            <button
              type="button"
              id="virtualDie"
              className={styles.modalButton}
              onClick={onRealDieClick}
            >
              Gastar {hpRecoveredNotation} {'=>'} +
              {parseInt(realDie || 0, 10) + extraConHp} HP
            </button>{' '}
          </label>
        )}
        {action === 'longRest' && (
          <label htmlFor="longRest" className={appStyles.inputButtonRow}>
            <button
              type="button"
              id="longRest"
              className={styles.modalButton}
              onClick={onLongRestClick}
            >
              Recuperar HP y {hitDiceRecoveredForLongRest} dados de golpe
            </button>
          </label>
        )}
      </div>
    </div>
  );
}

export default HitDiceActions;
