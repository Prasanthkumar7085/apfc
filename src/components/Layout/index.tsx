import { FC, ReactNode } from "react";
import HeadNavbar from "./HeadNavbar";
import SideNavBar from "./SideNavbar";

interface pageProps {
    children: ReactNode;
}

const LayoutNavbar: FC<pageProps> = ({ children }) => {

    return (
        <div>
            <HeadNavbar />
            <SideNavBar />
            <div>
                <main>{children}</main>
            </div>
        </div>
    );
}
export default LayoutNavbar; 