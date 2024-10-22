import RegistrationForm from "@/components/RegistrationForm";

export default async function Signin() {
    return (
        <div className=" flex flex-col items-center gap-4">
            <h1>Регистрация</h1>
            <RegistrationForm />
        </div>
    )
}