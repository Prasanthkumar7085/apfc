import { FC, ReactNode } from "react";
import HeadNavbar from "./HeadNavbar";
import SideNavBar from "./SideNavbar";
import styles from "./index.module.css"

interface pageProps {
    children: ReactNode;
}

const LayoutNavbar: FC<pageProps> = ({ children }) => {

    return (
        <div>
            <HeadNavbar />
            <div style={{ display: "flex", flexDirection: "row", }}>
                <SideNavBar />
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </div>
    );
}
export default LayoutNavbar; 