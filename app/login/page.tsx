import {loginAction} from "@/app/actions";

export default function Login() {
    return (
        <div>
            <form action={loginAction}>
                <input type="email" name="username" style={{color: '#000000'}} />
                <input type="password" name="password" style={{color: '#000000'}} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}