'use client'
import {useRouter} from "next/navigation";
import {useFormState} from 'react-dom'
import {loginAction} from "@/app/actions";

type LoginData = {
    access_token: string | null
}

export function LoginForm() {
    const router = useRouter()
    const [state, formAction] = useFormState<LoginData, FormData>(loginAction, {access_token: null})
    if(state.access_token) {
        sessionStorage.setItem('bike_access_token', state.access_token)
        router.push('/bikes')
    }

    return (
        <form action={formAction}>
            <input type="email" name="username" style={{color: '#000000'}}/>
            <input type="password" name="password" style={{color: '#000000'}}/>
            <button type="submit">Login</button>
            {state.access_token && <div>{state.access_token}</div>}
        </form>
    )
}