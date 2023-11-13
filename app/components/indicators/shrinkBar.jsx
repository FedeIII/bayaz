import { increment } from '~/domain/display';

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
        ? 'bar__redBar'
        : 'bar__orangeBar'
      : 'bar__greenBar';

  return (
    <div className="bar">
      <span className={barStyle}>{Array(filled).fill('▓')}</span>
      <span className="bar__xBlueBar">{Array(extra).fill('▓')}</span>
      <span className={barStyle}>{Array(empty).fill('░')}</span>
      <span className="bar__cursorOverlay">
        {cursorPos}/{maxValue} {!!extraValue && `(${increment(extraValue)})`}
      </span>
    </div>
  );
}
