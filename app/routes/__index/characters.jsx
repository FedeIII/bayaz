import { Outlet } from "@remix-run/react";
import styles from "~/components/characters.module.css";

function Characters() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}

export default Characters;
