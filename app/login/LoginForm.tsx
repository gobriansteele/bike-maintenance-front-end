'use client'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/app/actions'

type LoginData = {
  success: boolean
}

export function LoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState<LoginData, FormData>(loginAction, {
    success: false,
  })

  useEffect(() => {
    if (state.success) {
      router.push('/bikes')
    }
  }, [router, state.success])

  return (
    <form action={formAction}>
      <input type="email" name="username" style={{ color: '#000000' }} />
      <input type="password" name="password" style={{ color: '#000000' }} />
      <button type="submit">Login</button>
      {state.success && <div>{state.success}</div>}
    </form>
  )
}
