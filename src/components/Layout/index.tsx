import { FC, ReactNode } from "react";
import HeadNavbar from "./HeadNavbar";
import SideNavBar from "./SideNavbar";
import styles from "./index.module.css"

interface pageProps {
    children: ReactNode;
}

const LayoutNavbar: FC<pageProps> = ({ children }) => {

    return (
        <div style={{ display: "flex", flexDirection: "row",height:"100vh",overflow:"auto" ,marginLeft:"12rem"}}>
            <SideNavBar />
            <div style={{width:"100%"}}>
                <HeadNavbar />
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </div>

    );
}
export default LayoutNavbar; 