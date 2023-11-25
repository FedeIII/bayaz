import { itemWithAmount } from '~/domain/display';
import { translateEquipment } from '~/domain/equipment/equipment';

export function EquipmentCombo(props) {
  const { pc, comboName, combo, logic, comboSection, depth = 0 } = props;

  if (combo.or)
    return (
      <div className="characters__equipment-card--wide">
        {depth === 0 && (
          <h3 className="characters__card-title">Escoge entre</h3>
        )}
        <div
          className={`characters__traits ${
            combo.or?.[0].packName ? 'characters__traits--combo' : ''
          }`}
        >
          {combo.or.map((orItem, i) => (
            <EquipmentCombo
              pc={pc}
              comboName={comboName}
              combo={orItem}
              logic="or"
              comboSection={comboSection}
              depth={depth + 1}
              key={i}
            />
          ))}
        </div>
      </div>
    );

  if (combo.and) {
    if (logic === 'or') {
      return (
        <label
          htmlFor={`${combo.name}-${comboSection}`}
          className="characters__equipment-item"
          key={combo.name}
        >
          <input
            type="radio"
            name={
              comboName
                ? `${comboName}-choices-${comboSection}`
                : `choices-${comboSection}`
            }
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
          {depth === 0 && (
            <h3 className="characters__card-title">
              {translateEquipment(combo.and[0].type)}
            </h3>
          )}
          <div>
            <input
              readOnly
              type="text"
              name={
                comboName
                  ? `${comboName}-choices-${comboSection}`
                  : `choices-${comboSection}`
              }
              id={combo.name}
              value={combo.and
                .map(item => `${item.name},${item.amount}`)
                .join('|')}
              hidden
            />
            {combo.and.map((andItem, i) => (
              <EquipmentCombo
                pc={pc}
                comboName={comboName}
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
          htmlFor={`${combo.map(i => i.name).join('-')}-${comboSection}`}
          className="characters__equipment-item"
        >
          <input
            type="radio"
            name={
              comboName
                ? `${comboName}-choices-${comboSection}`
                : `choices-${comboSection}`
            }
            id={`${combo.map(i => i.name).join('-')}-${comboSection}`}
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
            comboName={comboName}
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
          className="characters__equipment-item"
        >
          <input
            type="radio"
            name={
              comboName
                ? `${comboName}-choices-${comboSection}`
                : `choices-${comboSection}`
            }
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
            htmlFor={`${combo.packName}-${comboSection}`}
            className="characters__equipment-item"
          >
            <input
              type="radio"
              name="pack"
              id={`${combo.packName}-${comboSection}`}
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
          {depth === 0 && (
            <h3 className="characters__card-title">
              {translateEquipment(combo.type)}
            </h3>
          )}
          {itemWithAmount(combo.translation, combo.amount)}
          <input
            readOnly
            type="text"
            name={comboName ? `${comboName}-items[]` : 'items[]'}
            value={[combo.name, combo.amount]}
            hidden
          />
        </>
      );
    else if (combo.packName)
      return (
        <>
          {<h3 className="characters__card-title">Un {combo.translation}</h3>}
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
