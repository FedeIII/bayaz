import { Link } from '@remix-run/react';

function SizeSelect() {
  return (
    <div className="places__container">
      <Link to="village" className="menus__main-option places__village">
        <span className="menus__option-label">Aldea</span>
      </Link>
      <Link to="town" className="menus__main-option places__town">
        <span className="menus__option-label">Pueblo</span>
      </Link>
      <Link to="city" className="menus__main-option places__city">
        <span className="menus__option-label">Ciudad</span>
      </Link>
    </div>
  );
}

export default SizeSelect;
