import LoginPage from "@/components/Auth/SignIn";
import { Suspense } from "react";


export default function Home() {
  return (
    <Suspense>
        <LoginPage />
    </Suspense>
  );
}
