'use client'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/app/actions'

export function LoginForm() {
  const router = useRouter()
  const [success, formAction] = useActionState<boolean, FormData>(
    loginAction,
    false
  )

  useEffect(() => {
    if (success) {
      router.push('/bikes')
    }
  }, [router, success])

  return (
    <form action={formAction}>
      <input type="email" name="username" style={{ color: '#000000' }} />
      <input type="password" name="password" style={{ color: '#000000' }} />
      <button type="submit">Login</button>
      {success && <div>{success}</div>}
    </form>
  )
}
