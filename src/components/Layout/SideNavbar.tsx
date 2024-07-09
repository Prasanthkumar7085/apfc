import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const SideNavBar = () => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="navbar">
      <div className="headerMenu">
        <Image
          className="logoIcon"
          alt=""
          src="/logo1.svg"
          width={60}
          height={60}
        />

        <div className="navgroup">
          <div
            className={path.includes("/devices") ? "menuBtn Active" : "menuBtn "}
            onClick={() => router.push("/devices")}
          >
            <Image alt="" src={path.includes("/devices") ? "/device-menuIcon.svg" : "/device-menu-active.svg"} width={16} height={16} />
            <h6 className="menuTxt">Devices</h6>
          </div>
          <div
            className={path.includes("/users") ? "menuBtn Active" : "menuBtn "}
            onClick={() => router.push("/users")}
          >
            <Image alt="" src={path.includes("/users") ? " /user-menu-active.svg" : "/user-menuIcon.svg"} width={16} height={16} />
            <h6 className="menuTxt">Users</h6>
          </div>
        </div>
      </div>
      <div className="menuBtn">
        <Image alt="" src="/icon.svg" width={18} height={18} />
        <h6 className="menuTxt">Need Help</h6>
      </div>
    </div>
  );
};

export default SideNavBar;
