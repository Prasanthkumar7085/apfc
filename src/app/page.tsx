import LoginPage from "@/components/Auth/SignIn";
import { Suspense } from "react";


export default function Home() {
  return (
    <Suspense>
      <div>
        <LoginPage />
      </div>
    </Suspense>
  );
}
