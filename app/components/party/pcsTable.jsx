import { Link } from '@remix-run/react';
import { useState, useMemo } from 'react';
import classNames from 'classnames';

import { t } from '~/domain/translations';
import {
  getArmorClass,
  getMaxHitPoints,
  getPassivePerception,
  getStat,
  getStatMod,
  skillCheckBonus,
  SKILLS,
  STATS,
  statSavingThrow,
} from '~/domain/characters';
import { increment } from '~/domain/display';
import { getAllIdentifiedItems } from '~/domain/equipment/items';
import { getItem } from '~/domain/equipment/equipment';

function CollapsableTh(props) {
  const { column, rowSpan, colSpan, className, columns, setColumns, children } =
    props;

  return (
    <th
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={classNames(className, 'column-collapse')}
      onClick={() => setColumns({ ...columns, [column]: !columns[column] })}
    >
      {children}
      <span className="column-collapse-span">
        {columns[column] ? '▼' : '▶'}
      </span>
    </th>
  );
}

function columnClass(column) {
  return column ? '' : 'party__pcs-table-cell--collapsed';
}

function getUniqueLanguages(pcs) {
  const languageSet = new Set();
  pcs.forEach(pc => {
    pc.languages.forEach(lang => languageSet.add(lang));
  });
  return Array.from(languageSet);
}

function PcsTable(props) {
  const { pcs } = props;

  const [columns, setColumns] = useState({
    pClass: false,
    race: false,
    languages: true,
    ac: true,
    hp: true,
    passivePerception: false,
    items: false,
    stats: true,
    skills: true,
  });

  const [selectedPc, setSelectedPc] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const uniqueLanguages = useMemo(() => getUniqueLanguages(pcs), [pcs]);

  return (
    <table className="party__pcs-table">
      <thead>
        <tr>
          <th rowSpan="2" className="party__pcs-table-fixed-column">
            Nombre
          </th>
          <CollapsableTh
            rowSpan="2"
            className={columnClass(columns.pClass)}
            column="pClass"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.pClass ? (
              'Clase'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                cl
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="2"
            className={columnClass(columns.race)}
            column="race"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.race ? (
              'Raza'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                ra
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="2"
            className={columnClass(columns.languages)}
            column="languages"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.languages ? (
              <>
                Idiomas
                <select
                  className={classNames(
                    'party__pcs-column-select',
                    'characters__input',
                    'characters__input--no-border'
                  )}
                  value={selectedLanguage}
                  onChange={e => setSelectedLanguage(e.target.value)}
                  onClick={e => e.stopPropagation()}
                >
                  <option value="">Todos</option>
                  {uniqueLanguages.map(lang => (
                    <option key={lang} value={lang}>
                      {t(lang)}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                id
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="2"
            className={columnClass(columns.ac)}
            column="ac"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.ac ? (
              'AC'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                ac
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="2"
            className={columnClass(columns.hp)}
            column="hp"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.hp ? (
              'HP'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                hp
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="2"
            className={columnClass(columns.passivePerception)}
            column="passivePerception"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.passivePerception ? (
              'Percepción pasiva'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                pp
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="2"
            className={columnClass(columns.items)}
            column="items"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.items ? (
              'Items'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                It
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="1"
            colSpan="6"
            className={columnClass(columns.stats)}
            column="stats"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.stats ? (
              'Características (Salvación)'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                Car
              </span>
            )}
          </CollapsableTh>
          <CollapsableTh
            rowSpan="1"
            colSpan={SKILLS().length}
            className={columnClass(columns.skills)}
            column="skills"
            columns={columns}
            setColumns={setColumns}
          >
            {columns.skills ? (
              'Habilidades'
            ) : (
              <span className="party__pcs-table-column-collapsed-title">
                Hab
              </span>
            )}
          </CollapsableTh>
        </tr>
        <tr>
          {STATS().map(stat => (
            <th key={stat} className={columnClass(columns.stats)}>
              {columns.stats ? stat : null}
            </th>
          ))}
          {SKILLS().map(skill => (
            <th key={skill.name} className={columnClass(columns.skills)}>
              {columns.skills ? skill.abbr : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pcs.map(pc => (
          <tr
            key={pc.id}
            onClick={() => setSelectedPc(pc.id)}
            className={
              selectedPc === pc.id ? 'party__pcs-table-selected-row' : ''
            }
          >
            <td className="party__pcs-table-cell party__pcs-table-fixed-column">
              <Link
                to={`/characters/pc/${pc.id}/summary`}
                className="party__pcs-table-name-link"
                target="_blank"
              >
                {pc.name}
              </Link>
            </td>
            <td
              className={`party__pcs-table-cell ${columnClass(columns.pClass)}`}
            >
              {columns.pClass ? t(pc.pClass) : null}
            </td>
            <td
              className={`party__pcs-table-cell ${columnClass(columns.race)}`}
            >
              {columns.race ? t(pc.race) : null}
            </td>
            <td
              className={`party__pcs-table-cell party__pcs-table-cell--xxxs ${columnClass(
                columns.languages
              )}`}
            >
              {columns.languages
                ? pc.languages
                    .filter(
                      lang => !selectedLanguage || lang === selectedLanguage
                    )
                    .map(t)
                    .join(', ')
                : null}
            </td>
            <td className={`party__pcs-table-cell ${columnClass(columns.ac)}`}>
              {columns.ac ? getArmorClass(pc) : null}
            </td>
            <td className={`party__pcs-table-cell ${columnClass(columns.hp)}`}>
              {columns.hp ? `${pc.hitPoints}/${getMaxHitPoints(pc)}` : null}
            </td>
            <td
              className={`party__pcs-table-cell ${columnClass(
                columns.passivePerception
              )}`}
            >
              {columns.passivePerception ? getPassivePerception(pc) : null}
            </td>
            <td
              className={`party__pcs-table-cell party__pcs-table-cell--xxxs ${columnClass(
                columns.items
              )}`}
            >
              {columns.items
                ? getAllIdentifiedItems(pc).map(item => (
                    <div key={item.name}>{getItem(item).translation}</div>
                  ))
                : null}
            </td>
            {STATS().map(statName => (
              <td
                key={statName}
                className={`party__pcs-table-cell ${columnClass(
                  columns.stats
                )}`}
              >
                {columns.stats && (
                  <>
                    {increment(getStatMod(getStat(pc, statName)))}
                    <br />
                    <span className="party__pcs-table-cell--xxs party__pcs-table-cell--pale">
                      (
                      {increment(
                        statSavingThrow(statName, getStat(pc, statName), pc)
                      )}
                      )
                    </span>
                  </>
                )}
              </td>
            ))}
            {SKILLS().map(skill => (
              <td
                key={skill.name}
                className={`party__pcs-table-cell ${columnClass(
                  columns.skills
                )}`}
              >
                {columns.skills && increment(skillCheckBonus(pc, skill.name))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PcsTable;
