const MODAL_VERTICAL_OFFSET_TOP = 100;
const MODAL_VERTICAL_OFFSET_BOTTOM = 20;
const MODAL_HORIZONTAL_OFFSET_RIGHT = 50;
const MODAL_HORIZONTAL_OFFSET_LEFT = -180;

export function getSelfTopY({
  elPos,
  formPos,
  selfPosition,
  bigModal,
  showOverMouse = 0,
}) {
  let selfTopY = (elPos?.y || 0) - (formPos?.y || 0);
  const selfHeight = selfPosition?.height || 0;
  const selfBottomY = selfTopY + selfHeight;
  const formTopY = -formPos?.y || 0;
  const windowHeight = window?.innerHeight || 0;
  const formBottomY = formTopY + windowHeight;

  if (bigModal) return formTopY + MODAL_VERTICAL_OFFSET_TOP;

  if (selfTopY < formTopY + MODAL_VERTICAL_OFFSET_TOP)
    selfTopY = formTopY + MODAL_VERTICAL_OFFSET_TOP + selfHeight;
  if (selfBottomY > formBottomY - MODAL_VERTICAL_OFFSET_BOTTOM)
    selfTopY = formBottomY - MODAL_VERTICAL_OFFSET_BOTTOM - selfHeight;

  return showOverMouse ? selfTopY - showOverMouse : selfTopY - selfHeight;
}

export function getSelfLeftX({
  elPos,
  formPos,
  selfPosition,
  center,
  bigModal,
}) {
  const selfWidth = selfPosition?.width || 0;
  const formWidth = formPos?.width || 0;
  const formLeftX = formPos?.x || 0;

  let selfLeftX = (elPos?.x || 0) - formLeftX - (center ? selfWidth / 2 : 0);

  if (
    bigModal &&
    selfLeftX + formLeftX + selfWidth >
      formWidth - MODAL_HORIZONTAL_OFFSET_RIGHT
  )
    selfLeftX =
      formWidth - MODAL_HORIZONTAL_OFFSET_RIGHT - selfWidth - formLeftX;

  if (bigModal && selfLeftX < formLeftX + MODAL_HORIZONTAL_OFFSET_LEFT)
    selfLeftX = formLeftX + MODAL_HORIZONTAL_OFFSET_LEFT;

  return selfLeftX;
}
