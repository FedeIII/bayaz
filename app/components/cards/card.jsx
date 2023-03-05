import cardStyles from './cards.module.css';

export function Card(props) {
  const { title, children } = props;

  return (
    <div className={cardStyles.card}>
      <h3 className={cardStyles.cardTitle}>{title}</h3>
      <div className={cardStyles.cardBody}>{children}</div>
    </div>
  );
}
