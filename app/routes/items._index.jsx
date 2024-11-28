import { Link } from '@remix-run/react';

function ItemsMenu() {
  return (
    <div className="menus__container">
      <Link to="new" className="menus__main-option">
        <span className="menus__option-label">Crear Item</span>
      </Link>
      <Link to="list" className="menus__main-option">
        <span className="menus__option-label">Lista de Items</span>
      </Link>
      <Link to="/" className="menus__main-option">
        <span className="menus__option-label">/</span>
      </Link>
    </div>
  );
}

export default ItemsMenu;
