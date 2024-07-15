import { FC, ReactNode } from "react";
import HeadNavbar from "./HeadNavbar";
import SideNavBar from "./SideNavbar";
import { usePathname } from "next/navigation";

interface pageProps {
    children: ReactNode;
}

const LayoutNavbar: FC<pageProps> = ({ children }) => {
    const pathname = usePathname();

    return (
        <div className="mainBodyContainer" >
            <SideNavBar />
            <div className="mainContainer" style={{
                backgroundColor: ['/update-settings', '/devices/add', '/users/add'].some(path => pathname.includes(path)) ? "#F5F7FA" : "#fff"
            }}>
                <HeadNavbar />
                <div className="mainChlidren">
                    {children}
                </div>
            </div>
        </div>

    );
}
export default LayoutNavbar; 