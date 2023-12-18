const MODAL_VERTICAL_OFFSET_TOP = 100;
const MODAL_VERTICAL_OFFSET_BOTTOM = 20;
const MODAL_HORIZONTAL_OFFSET_RIGHT = 20;
const MODAL_HORIZONTAL_OFFSET_LEFT = 20;
const MODAL_HORIZONTAL_GAP = 10;

export function getSelfTopY({
  elPos,
  formPos,
  selfPosition,
  bigModal,
  center,
  showOverMouse = 0,
}) {
  const selfWidth = selfPosition?.width || 0;
  const selfHeight = selfPosition?.height || 0;
  const formTopY = -formPos?.y || 0;
  const formWidth = formPos?.width || 0;
  const formHeight = formPos?.height || 0;
  const windowHeight = window?.innerHeight || 0;
  const formLeftX = formPos?.x || 0;
  const formBottomY = formTopY + windowHeight;
  let selfTopY = formTopY + (elPos?.y || 0) - (selfHeight || 0);
  const selfBottomY = selfTopY + selfHeight;

  let selfLeftX =
    (elPos?.x || 0) -
    formLeftX +
    MODAL_HORIZONTAL_GAP +
    (center ? selfWidth / 2 : 0);

  if (bigModal) return formTopY + MODAL_VERTICAL_OFFSET_TOP;

  // overflows at the bottom
  if (
    selfTopY - formTopY + selfHeight >
    formHeight - MODAL_VERTICAL_OFFSET_BOTTOM
  ) {
    selfTopY =
      formTopY + formHeight - MODAL_VERTICAL_OFFSET_BOTTOM - selfHeight;
  }

  // overflows at the top
  if (selfTopY - formTopY < MODAL_VERTICAL_OFFSET_TOP) {
    selfTopY = formTopY + MODAL_VERTICAL_OFFSET_TOP;
  }

  // overflows at the right
  if (selfLeftX + selfWidth > formWidth - MODAL_HORIZONTAL_OFFSET_RIGHT) {
    selfTopY = formTopY + elPos.y + elPos.height;
  }

  // return showOverMouse ? selfTopY - showOverMouse : selfTopY - selfHeight;

  return selfTopY;
}

export function getSelfLeftX({
  elPos,
  formPos,
  selfPosition,
  center,
  bigModal,
}) {
  const selfWidth = selfPosition?.width || 0;
  const selfHeight = selfPosition?.height || 0;
  const formWidth = formPos?.width || 0;
  const formLeftX = formPos?.x || 0;
  const formTopY = -formPos?.y || 0;
  const selfTopY = formTopY + (elPos?.y || 0) - (selfHeight || 0);

  let selfLeftX =
    (elPos?.x || 0) -
    formLeftX +
    MODAL_HORIZONTAL_GAP +
    (center ? selfWidth / 2 : 0);

  // overflows at the left
  if (selfLeftX < MODAL_HORIZONTAL_OFFSET_LEFT) {
    selfLeftX = MODAL_HORIZONTAL_OFFSET_LEFT;
  }

  // overflows at the right
  if (selfLeftX + selfWidth > formWidth - MODAL_HORIZONTAL_OFFSET_RIGHT) {
    selfLeftX = formWidth - selfWidth - MODAL_HORIZONTAL_OFFSET_RIGHT * 10;
  } else {
    // overflows at the top
    if (selfTopY - formTopY < MODAL_VERTICAL_OFFSET_TOP) {
      selfLeftX += elPos?.width || 0;
    }
  }

  return selfLeftX;
}
