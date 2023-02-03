import { Link, Outlet } from "@remix-run/react";
import styles from "~/components/app.module.css";

export default function Index() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>Bayaz</header>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <Link to="/dice" className={styles.mainButton}>
            Dados
          </Link>
          <Link to="/places" className={styles.mainButton}>
            Lugares
          </Link>
          <Link to="/characters" className={styles.mainButton}>
            Personajes
          </Link>
          <Link to="/" className={styles.mainButton}>
            Button 4
          </Link>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
