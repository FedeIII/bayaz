import { useEffect, useState } from 'react';
import { spendTrait } from '~/services/pc.server';

const capitalize = name => name.slice(0, 1).toUpperCase() + name.slice(1);

export function createActions(pClass, traitName) {
  return {
    [`spend${capitalize(traitName)}`]: async formData => {
      const id = formData.get('id');
      const updatedPc = await spendTrait(id, pClass, traitName);
      return updatedPc;
    },
  };
}

export default function SpendTrait(props) {
  const { pc, traitName, submit, traitGetter } = props;

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
    <div className="inventory-item__modal-buttons inventory-item__modal-buttons--wide">
      <span>Usos restantes: {trait}</span>
      {trait > 0 && (
        <button type="button" onClick={onSpendTraitClick}>
          Gastar
        </button>
      )}
    </div>
  );
}
