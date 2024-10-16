import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
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
import { useState } from 'react';
import { getAllIdentifiedItems } from '~/domain/equipment/items';
import { getItem } from '~/domain/equipment/equipment';

export const loader = async ({ params }) => {
  const party = await getParty(params.id);
  if (!party) {
    throw new Error('Party not found');
  }

  const pcs = await Promise.all(party.players.map(pcId => getPc(pcId)));

  return json({ pcs });
};

function CollapseSpan(props) {
  const { column, columns, setColumns } = props;

  return (
    <span
      onClick={() => setColumns({ ...columns, [column]: !columns[column] })}
      className="column-collapse"
    >
      {columns[column] ? '▼' : '▶'}
    </span>
  );
}

function columnClass(column) {
  return column ? '' : 'party__pcs-table-cell--collapsed';
}

function PcsTable() {
  const { pcs } = useLoaderData();

  const [columns, setColumns] = useState({
    pClass: true,
    race: true,
    languages: true,
    ac: true,
    hp: true,
    passivePerception: true,
    items: true,
    stats: true,
    skills: true,
  });

  const [selectedPc, setSelectedPc] = useState(null);

  return (
    <>
      <h2>Party</h2>
      <div className="party__pcs-table-container">
        <table className="party__pcs-table">
          <thead>
            <tr>
              <th rowSpan="2" className="party__pcs-table-fixed-column">Nombre</th>
              <th rowSpan="2" className={columnClass(columns.pClass)}>
                {columns.pClass ? 'Clase' : null}{' '}
                <CollapseSpan
                  column="pClass"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th rowSpan="2" className={columnClass(columns.race)}>
                {columns.race ? 'Raza' : null}{' '}
                <CollapseSpan
                  column="race"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th rowSpan="2" className={columnClass(columns.languages)}>
                {columns.languages ? 'Idiomas' : null}{' '}
                <CollapseSpan
                  column="languages"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th rowSpan="2" className={columnClass(columns.ac)}>
                {columns.ac ? 'AC' : null}{' '}
                <CollapseSpan
                  column="ac"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th rowSpan="2" className={columnClass(columns.hp)}>
                {columns.hp ? 'HP' : null}{' '}
                <CollapseSpan
                  column="hp"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th rowSpan="2" className={columnClass(columns.passivePerception)}>
                {columns.passivePerception ? 'Percepción pasiva' : null}{' '}
                <CollapseSpan
                  column="passivePerception"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th rowSpan="2" className={columnClass(columns.items)}>
                {columns.items ? 'Objetos' : null}{' '}
                <CollapseSpan
                  column="items"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th rowSpan="1" colSpan="6" className={columnClass(columns.stats)}>
                {columns.stats ? 'Características (Salvación)' : 'Car'}{' '}
                <CollapseSpan
                  column="stats"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
              <th
                rowSpan="1"
                colSpan={SKILLS().length}
                className={columnClass(columns.skills)}
              >
                {columns.skills ? 'Habilidades' : 'Hab'}{' '}
                <CollapseSpan
                  column="skills"
                  columns={columns}
                  setColumns={setColumns}
                />
              </th>
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
                  >
                    {pc.name}
                  </Link>
                </td>
                <td
                  className={`party__pcs-table-cell ${columnClass(
                    columns.pClass
                  )}`}
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
                  {columns.languages ? pc.languages.map(t).join(', ') : null}
                </td>
                <td
                  className={`party__pcs-table-cell ${columnClass(columns.ac)}`}
                >
                  {columns.ac ? getArmorClass(pc) : null}
                </td>
                <td
                  className={`party__pcs-table-cell ${columnClass(columns.hp)}`}
                >
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
                    {columns.stats &&
                      increment(getStatMod(getStat(pc, statName)))}
                    <br />
                    <span className="party__pcs-table-cell--xxs party__pcs-table-cell--pale">
                      (
                      {increment(
                        statSavingThrow(
                          statName,
                          getStat(pc, statName),
                          pc.pClass,
                          pc.level
                        )
                      )}
                      )
                    </span>
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
      </div>
    </>
  );
}

export default PcsTable;
