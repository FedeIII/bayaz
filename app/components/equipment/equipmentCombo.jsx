import { itemWithAmount } from '~/domain/display';
import { translateEquipment } from '~/domain/equipment/equipment';

import styles from '~/components/characters.module.css';

export function EquipmentCombo(props) {
  const { pc, combo, logic, comboSection, depth = 0 } = props;

  if (combo.or)
    return (
      <>
        {depth === 0 && <h3>Escoge entre</h3>}
        {/* {depth > 0 && <span>entre</span>} */}
        <div>
          {combo.or.map((orItem, i) => (
            <EquipmentCombo
              pc={pc}
              combo={orItem}
              logic="or"
              comboSection={comboSection}
              depth={depth + 1}
              key={i}
            />
          ))}
        </div>
      </>
    );

  if (combo.and) {
    if (logic === 'or') {
      return (
        <label
          htmlFor={`${combo.name}-${comboSection}`}
          className={styles.equipmentItem}
          key={combo.name}
        >
          <input
            type="radio"
            name={`choices-${comboSection}`}
            id={`${combo.name}-${comboSection}`}
            value={combo.and
              .map(item => `${item.name},${item.amount}`)
              .join('|')}
          />{' '}
          {combo.and
            .map(item => itemWithAmount(item.translation, item.amount))
            .join(', ')}
        </label>
      );
    } else {
      return (
        <>
          {depth === 0 && <h3>{translateEquipment(combo.and[0].type)}</h3>}
          {/* {depth > 0 && <span>entre</span>} */}
          <div>
            <input
              readOnly
              type="text"
              name={`choices-${comboSection}`}
              id={combo.name}
              value={combo.and
                .map(item => `${item.name},${item.amount}`)
                .join('|')}
              hidden
            />
            {combo.and.map((andItem, i) => (
              <EquipmentCombo
                pc={pc}
                combo={andItem}
                logic="and"
                comboSection={comboSection}
                depth={depth + 1}
                key={i}
              />
            ))}
          </div>
        </>
      );
    }
  }

  if (logic === 'or') {
    if (Array.isArray(combo)) {
      return (
        <label
          htmlFor={`${combo.name}-${comboSection}`}
          className={styles.equipmentItem}
        >
          <input
            type="radio"
            name={`choices-${comboSection}`}
            id={`${combo.name}-${comboSection}`}
            value={combo
              .map(comboItem => `${comboItem.name},${comboItem.amount}`)
              .join('|')}
          />{' '}
          {combo
            .map(item => itemWithAmount(item.translation, item.amount))
            .join(', ')}
        </label>
      );
    } else if (combo.if) {
      if (combo.if(pc))
        return (
          <EquipmentCombo
            pc={pc}
            combo={combo.item}
            logic="or"
            comboSection={comboSection}
            depth={depth + 1}
          />
        );
      else return null;
    } else if (combo.type) {
      return (
        <label
          htmlFor={`${combo.name}-${comboSection}`}
          className={styles.equipmentItem}
        >
          <input
            type="radio"
            name={`choices-${comboSection}`}
            id={`${combo.name}-${comboSection}`}
            value={[combo.name, combo.amount]}
          />{' '}
          {itemWithAmount(combo.translation, combo.amount)}
        </label>
      );
    } else if (combo.packName) {
      return (
        <>
          <label
            htmlFor={`${combo.name}-${comboSection}`}
            className={styles.equipmentItem}
          >
            <input
              type="radio"
              name="pack"
              id={`${combo.name}-${comboSection}`}
              value={combo.packName}
            />{' '}
            {combo.translation}
            <div>
              Que contiene:
              <ul>
                {Object.values(combo.items).map(item => (
                  <li key={item().name}>{item().translation}</li>
                ))}
              </ul>
            </div>
          </label>
        </>
      );
    }
  } else if (logic === 'and') {
    if (combo.type)
      return <li>{itemWithAmount(combo.translation, combo.amount)}</li>;
  } else {
    if (combo.type)
      return (
        <>
          {depth === 0 && <h3>{translateEquipment(combo.type)}</h3>}
          {/* {depth > 0 && <h4>{translateEquipment(combo.type)}s </h4>} */}
          {itemWithAmount(combo.translation, combo.amount)}
          <input
            readOnly
            type="text"
            name="items[]"
            value={[combo.name, combo.amount]}
            hidden
          />
        </>
      );
    else if (combo.packName)
      return (
        <>
          {<h3>Un {combo.translation}</h3>}
          <input
            readOnly
            type="text"
            name="pack"
            value={combo.packName}
            hidden
          />
          <div>
            Que contiene:
            <ul>
              {Object.values(combo.items).map(item => (
                <li key={item().name}>{item().translation}</li>
              ))}
            </ul>
          </div>
        </>
      );
  }

  return 'Equipment case not implemented';
}
