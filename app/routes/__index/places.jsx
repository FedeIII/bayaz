import { Outlet } from "@remix-run/react";
import styles from "~/components/places.module.css";

function Places() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}

export default Places;
