import cardStyles from './cards.module.css';

export function Card(props) {
  const { title, style, children, className, singleCard } = props;

  return (
    <div
      className={`${
        singleCard ? cardStyles.singleCard : cardStyles.card
      } ${className}`}
      style={style}
    >
      <h3 className={cardStyles.cardTitle}>{title}</h3>
      <div className={cardStyles.cardBody}>{children}</div>
    </div>
  );
}
