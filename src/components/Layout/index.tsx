import { FC, ReactNode } from "react";
import HeadNavbar from "./HeadNavbar";
import SideNavBar from "./SideNavbar";

interface pageProps {
    children: ReactNode;
}

const LayoutNavbar: FC<pageProps> = ({ children }) => {

    return (
        <div className="mainBodyContainer" >
            <SideNavBar />
            <div className="mainContainer">
                <HeadNavbar />
                <div className="mainChlidren">
                    {children}
                </div>
            </div>
        </div>

    );
}
export default LayoutNavbar; 