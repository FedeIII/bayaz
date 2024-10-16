import styles from './cards.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function Card(props) {
  const {
    title,
    style,
    children,
    className,
    bodyClassName,
    titleClass,
    singleCard,
  } = props;

  return (
    <div
      className={`${singleCard ? 'cards__single-card' : 'card'} ${className}`}
      style={style}
    >
      <h3 className={`cards__card-title ${titleClass}`}>
        {typeof title === 'function' ? title() : title}
      </h3>
      <div className={`cards__card-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}
