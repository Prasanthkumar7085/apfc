import { Backdrop, CircularProgress } from "@mui/material";

const LoadingComponent = ({ loading }: { loading: Boolean }) => {

    return (
        <Backdrop
            sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                color: "green",
                backgroundColor: "rgba(256, 256, 256, 0.8)",
                zIndex: (theme: any) => theme.zIndex.drawer + 1,
            }}
            open={Boolean(loading)}
        >
            {/* <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 100, height: 100 }}
      /> */}
            <object type="image/svg+xml" data={"/loading-new.svg"} width={100} height={100}>svg-animation</object>
        </Backdrop>
    );
};
export default LoadingComponent;