import { useContext, useEffect } from 'react';
import MenuContext from '../contexts/menuContext';

export function useTitle(title) {
  const menuContext = useContext(MenuContext) || {};

  useEffect(() => {
    menuContext.setMenuTitle?.(title);
  }, []);
}
