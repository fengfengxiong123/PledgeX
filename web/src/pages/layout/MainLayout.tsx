import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss"
import Header from "@/components/header/Header";
function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default MainLayout;
