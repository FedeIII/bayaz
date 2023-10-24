import styles from './bar.module.css';

// ████▓▓▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░
// ██████████████████████████▒▒▒▒▒▓▓▓▓▓▓
// ██████████████████████████████████▓▓▓
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░

export function ShrinkBar(props) {
  const { cursorPos, maxValue, midValue, lowValue, color } = props;

  const total = 20;
  const filled = Math.max(
    Math.min(Math.round((cursorPos * total) / maxValue), total),
    0
  );
  const empty = total - filled;

  const barStyle =
    cursorPos < midValue
      ? cursorPos < lowValue
        ? styles.redBar
        : styles.orangeBar
      : styles.greenBar;

  return (
    <div className={styles.bar}>
      <span className={barStyle}>{Array(filled).fill('▓')}</span>
      <span className={barStyle}>{Array(empty).fill('░')}</span>
      <span className={styles.cursorOverlay}>
        {cursorPos}/{maxValue}
      </span>
    </div>
  );
}
