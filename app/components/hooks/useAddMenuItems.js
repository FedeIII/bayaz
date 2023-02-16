import { useContext, useEffect } from 'react';
import MenuContext from '../contexts/menuContext';

export function useAddMenuItems(previousItemUrl, newItems) {
  const menuContext = useContext(MenuContext) || {};
  const { menuItems, setMenuItems } = menuContext;

  useEffect(() => {
    setTimeout(() => {
      if (menuItems.find(item => item.name === newItems[0].name)) {
        setMenuItems(menuItems);
        return;
      }

      const previousItemIndex = menuItems.findIndex(
        item => item.url === previousItemUrl
      );
      const newMenuItems = [
        ...menuItems.slice(0, previousItemIndex + 1),
        ...newItems,
        ...menuItems.slice(previousItemIndex + 1, menuItems.length),
      ];
      setMenuItems(newMenuItems);
    }, 0);
  }, []);
}
