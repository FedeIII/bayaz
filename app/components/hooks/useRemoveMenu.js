import { useContext, useEffect } from 'react';
import MenuContext from '../contexts/menuContext';

export function useRemoveMenu() {
  const menuContext = useContext(MenuContext);
  useEffect(() => {
    setTimeout(() => menuContext.setHasMenu(false), 0);
  }, []);
}
