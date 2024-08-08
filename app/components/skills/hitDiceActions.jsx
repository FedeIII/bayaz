import { useState } from 'react';
import { CLASSES, getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import NumericInput from '../inputs/numeric';
import { longRest, shortRest } from '~/domain/mutations/characterMutations';

export const actions = {
  shortRest: async formData => {
    const id = formData.get('id');
    const die = formData.get('die');
    const diceAmount = formData.get('diceAmount');

    return shortRest(id, parseInt(diceAmount, 10), parseInt(die, 10));
  },

  longRest: async formData => {
    const id = formData.get('id');

    return await longRest(id);
  },
};

function HitDiceActions(props) {
  const { pc, submit, closeModal } = props;
  const { pClass, remainingHitDice, hitDice } = pc;

  function onVirtualDieClick() {
    closeModal();
    submit(
      {
        action: 'shortRest',
        id: pc.id,
        diceAmount: amountOfDice,
      },
      { method: 'post' }
    );
  }

  function onRealDieClick() {
    closeModal();
    submit(
      {
        action: 'shortRest',
        id: pc.id,
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
        id: pc.id,
      },
      { method: 'post' }
    );
  }

  const [realDie, setRealDie] = useState(null);
  const [amountOfDice, setAmountOfDice] = useState(1);
  const [action, setAction] = useState('');

  const extraConHp = amountOfDice * getStatMod(getStat(pc, 'con'));
  const hpRecoveredNotation = `${amountOfDice}${CLASSES()[pClass].hitDice.slice(
    1
  )} ${increment(extraConHp)}`;

  const hitDiceRecoveredForLongRest =
    hitDice / 2 >= 1 ? Math.floor(hitDice / 2) : 1;

  return (
    <div className="inventory-item__hp-container">
      <div className="inventory-item__modal-buttons-column">
        <h3 className="inventory-item__modal-content-title">Acción</h3>
        <label
          htmlFor="isRealDice"
          className="inventory-item__input-button-row"
        >
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
          <label
            htmlFor="diceAmount"
            className="inventory-item__input-button-row"
          >
            <span>Gastar</span>{' '}
            <NumericInput
              id="diceAmount"
              name="diceAmount"
              onKeyDown="return false"
              max={remainingHitDice}
              min="0"
              value={amountOfDice}
              onChange={e => setAmountOfDice(e.target.value)}
              styleName="inventory-item__modal-input inventory-item__modal-input-small"
            />{' '}
            <span>dado{amountOfDice !== 1 ? 's' : ''}:</span>
          </label>
        )}
        {action === 'virtualDice' && (
          <label
            htmlFor="virtualDie"
            className="inventory-item__input-button-row"
          >
            <button
              type="button"
              id="virtualDie"
              className="inventory-item__modal-button"
              onClick={onVirtualDieClick}
            >
              Tirar {hpRecoveredNotation}
            </button>
          </label>
        )}
        {action === 'realDice' && (
          <label htmlFor="realDie" className="app__input-button-column">
            <div className="app__input-with-tag">
              <span>Valor de los dados:</span>{' '}
              <NumericInput
                id="realDie"
                name="hitPointsRealDie"
                onKeyDown="return false"
                min="0"
                value={realDie}
                onChange={e => setRealDie(e.target.value)}
                styleName="inventory-item__modal-input inventory-item__modal-input-small"
              />
            </div>
            <button
              type="button"
              id="virtualDie"
              className="inventory-item__modal-button"
              onClick={onRealDieClick}
            >
              Gastar {hpRecoveredNotation} {'=>'} +
              {parseInt(realDie || 0, 10) + extraConHp} HP
            </button>{' '}
          </label>
        )}
        {action === 'longRest' && (
          <label
            htmlFor="longRest"
            className="inventory-item__input-button-row"
          >
            <button
              type="button"
              id="longRest"
              className="inventory-item__modal-button"
              onClick={onLongRestClick}
            >
              Recuperar HP, {hitDiceRecoveredForLongRest} dados de golpe, y
              espacios de conjuro
            </button>
          </label>
        )}
      </div>
    </div>
  );
}

export default HitDiceActions;
