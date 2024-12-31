import { useNavigation } from '@remix-run/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { spendTrait } from '~/services/pc.server';

const capitalize = name => name.slice(0, 1).toUpperCase() + name.slice(1);

export function createSpendActions(context, traitName, amountPropName) {
  return {
    [`spend${capitalize(traitName)}`]: async formData => {
      const id = formData.get('id');
      const restArgs = [context, traitName];
      if (amountPropName) {
        const amount = formData.get(amountPropName);
        restArgs.push(amount);
      }
      const updatedPc = await spendTrait(id, ...restArgs);
      return updatedPc;
    },
  };
}

export default function SpendTrait(props) {
  const { pc, traitName, submit, traitGetter, atHeader, openModal } = props;

  const navigation = useNavigation();
  const isIdle = navigation.state === 'idle';

  function onSpendTraitClick() {
    setTrait(old => (old - 1 < 0 ? 0 : old - 1));
    submit(
      {
        action: `spend${
          traitName.slice(0, 1).toUpperCase() + traitName.slice(1)
        }`,
        id: pc.id,
      },
      { method: 'post' }
    );
  }

  const [trait, setTrait] = useState(traitGetter(pc));
  useEffect(() => {
    setTrait(traitGetter(pc));
  }, [pc]);

  return (
    <div
      className={classNames('inventory-item__modal-buttons', {
        'inventory-item__modal-buttons--wide': !atHeader,
        'inventory-item__modal-buttons--at-header': atHeader,
      })}
    >
      <span>Usos restantes: {trait}</span>
      {trait > 0 && (
        <button type="button" disabled={!isIdle} onClick={onSpendTraitClick}>
          Gastar
        </button>
      )}
      {openModal && (
        <button
          type="button"
          onClick={() =>
            openModal(
              'remainingHitDice',
              0,
              {},
              'dontTriggerSeeTrait',
              'longRest'
            )('remainingHitDice', 'Dados de golpe')
          }
        >
          Descanso prolongado
        </button>
      )}
    </div>
  );
}
