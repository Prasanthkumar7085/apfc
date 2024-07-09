import { usePathname, useRouter } from "next/navigation";
import "./SideNavbar.scss";
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
            className={path.includes("/devices") ? "menuBtn" : "menuBtnActive"}
            onClick={() => router.push("/devices")}
          >
            <Image alt="" src="/server-1.svg" width={20} height={20} />
            <h6 className="menuTxt">Devices</h6>
          </div>
          <div
            className={path.includes("/users") ? "menuBtn" : "menuBtnActive"}
            onClick={() => router.push("/users")}
          >
            <Image alt="" src="/usersavatar-1-1.svg" width={20} height={20} />
            <h6 className="menuTxt">Users</h6>
          </div>
        </div>
      </div>
      <div className="helpbutton">
        <Image alt="" src="/icon.svg" width={24} height={24} />
        <h6 className="menuTxt">Need Help</h6>
      </div>
    </div>
  );
};

export default SideNavBar;
