import { increment } from '~/domain/display';
import styles from './bar.module.css';

// ████▓▓▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░
// ██████████████████████████▒▒▒▒▒▓▓▓▓▓▓
// ██████████████████████████████████▓▓▓
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░

export function ShrinkBar(props) {
  const {
    cursorPos,
    extraValue = 0,
    maxValue,
    midValue,
    lowValue,
    color,
  } = props;

  const total = 20;
  const filled = Math.max(
    Math.min(Math.round((cursorPos * total) / maxValue), total),
    0
  );
  const extra = Math.max(Math.round((extraValue * total) / maxValue), 0);
  const empty = Math.max(total - filled - extra, 0);

  const barStyle =
    cursorPos < midValue
      ? cursorPos < lowValue
        ? styles.redBar
        : styles.orangeBar
      : styles.greenBar;

  return (
    <div className={styles.bar}>
      <span className={barStyle}>{Array(filled).fill('▓')}</span>
      <span className={styles.xBlueBar}>{Array(extra).fill('▓')}</span>
      <span className={barStyle}>{Array(empty).fill('░')}</span>
      <span className={styles.cursorOverlay}>
        {cursorPos}/{maxValue} {!!extraValue && `(${increment(extraValue)})`}
      </span>
    </div>
  );
}
