import { GoogleButton } from "@/components/GoogleButton";
import { SignInForm } from "@/components/SigninForm";
import { Suspense } from "react";

export default async function Signin() {
    return (
        <div className=" flex flex-col items-center gap-4">
            <h1>SignIn</h1>
            <Suspense fallback={<>Loading...</>}>
                <GoogleButton />
            </Suspense>
            <SignInForm />
        </div>
    )
}