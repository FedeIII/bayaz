import classNames from 'classnames';
import { getAssociatedTable } from '~/domain/tables/searchTables';

function Cell(props) {
  const { value, position, className, setSelectedTableName } = props;

  const associatedTable = getAssociatedTable(value);

  return (
    <td
      className={classNames('glossary__table-column', {
        'glossary__table-column--first': position === 0,
        [className]: !!className,
      })}
    >
      {associatedTable ? (
        <button
          type="button"
          className="glossary__cell-button"
          onClick={() => setSelectedTableName(associatedTable.name)}
        >
          {value}
        </button>
      ) : (
        value
      )}
    </td>
  );
}

function SelectedTable(props) {
  const { table, selectedRow, setSelectedRow, setSelectedTableName } = props;

  return (
    <div className="glossary__results-section">
      <div className="glossary__section-header">
        <span className="glossary__header-title">{table.name}</span>
      </div>
      <table className="glossary__table">
        <thead className="glossary__table-head">
          <tr>
            {Object.keys(table.rows[0]).map((key, i) => (
              <th
                key={key}
                className={classNames('glossary__table-head-cell', {
                  'glossary__table-odd': i % 2,
                  'glossary__table-even': !(i % 2),
                })}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className={classNames('glossary__row', {
                'glossary__row--odd': i % 2 === 1,
                'glossary__row--even': i % 2 === 0,
                'glossary__row--selected': selectedRow == i,
              })}
              onClick={() => setSelectedRow(i)}
            >
              {Object.values(row).map((val, j) => (
                <Cell
                  key={val + j}
                  value={val}
                  position={j}
                  className={table.classNames?.td}
                  setSelectedTableName={setSelectedTableName}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SelectedTable;
