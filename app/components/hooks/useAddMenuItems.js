import { useContext, useEffect } from 'react';
import MenuContext from '../contexts/menuContext';

export function useAddMenuItems(
  previousItemUrl,
  newItems,
  menuItems,
  setMenuItems
) {
  const menuContext = useContext(MenuContext) || {};

  if (!menuItems && !setMenuItems) {
    menuItems = menuContext.menuItems;
    setMenuItems = menuContext.setMenuItems;
  }

  useEffect(() => {
    // (function (menuItems, newItems) {
    if (newItems?.length) {
      setTimeout(() => {
        if (menuItems?.find(item => item.name === newItems[0].name)) {
          setMenuItems(menuItems);
          return;
        }

        const previousItemIndex = menuItems?.findIndex(
          item => item.url === previousItemUrl
        );

        let newMenuItems = [];
        if (previousItemIndex) {
          newMenuItems = [
            ...menuItems.slice(0, previousItemIndex + 1),
            ...newItems,
            ...menuItems.slice(previousItemIndex + 1, menuItems.length),
          ];
        }
        setMenuItems?.(newMenuItems);
      }, 0);
    }
    // })(menuItems, newItems);
  }, [menuItems, newItems]);
}
