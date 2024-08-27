export default function Sidebar(props) {
  const { filters, setFilters, tables, setSelectedTable } = props;

  function onSearchChange(e) {
    const newFilters = { search: e.target.value };
    setFilters(f => ({ ...f, ...newFilters }));
  }

  function onTableChange(e) {
    const newFilters = { table: e.target.value };
    setFilters(f => ({ ...f, ...newFilters }));
  }

  const hasResults = !!(
    tables.title.length ||
    tables.keywords.length ||
    tables.rows.length
  );

  return (
    <div className="glossary__sidebar">
      <div className="glossary__sidebar-content">
        <div className="glossary__sidebar-section">
          <div className="glossary__filter">
            <label className="glossary__filter-label-inline">
              Búsqueda:{' '}
              <input
                className="cards__button-card cards__button-card-big"
                value={filters.search}
                onChange={onSearchChange}
              />
            </label>
          </div>
          <div className="glossary__filter">
            <label className="glossary__filter-label-inline">
              Tabla:{' '}
              <input
                className="cards__button-card cards__button-card-big"
                value={filters.table}
                onChange={onTableChange}
              />
            </label>
          </div>
        </div>

        {hasResults && (
          <div className="glossary__sidebar-section">
            {[...tables.title, ...tables.keywords, ...tables.rows].map(
              table => (
                <div key={table.name} className="glossary__filter">
                  <button
                    type="button"
                    className="cards__button-card"
                    onClick={() => setSelectedTable(table.name)}
                  >
                    {table.name}
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
