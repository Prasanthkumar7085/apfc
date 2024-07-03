import { useRouter } from "next/navigation";
import styles from "./SideNavbar.module.css";

const SideNavBar = () => {
  const router = useRouter();
  return (
    <div className={styles.navbar}>
      <div className={styles.headermenu}>
        <img className={styles.logoIcon} alt="" src="/logo1.svg" />
        <div className={styles.navgroup}>
          <div className={styles.menuItem}
            onClick={() => router.push("/devices")}
          >
            <img className={styles.server1Icon} alt="" src="/server-1.svg" />
            <h6 className={styles.devices}>Devices</h6>
          </div>
          <div className={styles.menuItem1}
            onClick={() => router.push("/users")}
          >
            <img
              className={styles.server1Icon}
              alt=""
              src="/usersavatar-1-1.svg"
            />
            <h6 className={styles.devices}>Users</h6>
          </div>
        </div>
      </div>
      <div className={styles.helpbutton}>
        <img className={styles.icon} alt="" src="/icon.svg" />
        <h6 className={styles.devices}>Need Help</h6>
      </div>
    </div>
  );
};

export default SideNavBar;
