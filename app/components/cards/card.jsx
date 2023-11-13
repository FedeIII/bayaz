import styles from './cards.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function Card(props) {
  const { title, style, children, className, singleCard } = props;

  return (
    <div
      className={`${
        singleCard ? 'cards__single-card' : 'card'
      } ${className}`}
      style={style}
    >
      <h3 className="cards__card-title">{title}</h3>
      <div className="cards__card-body">{children}</div>
    </div>
  );
}
