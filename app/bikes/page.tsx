import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { LogoutButton } from '@/components'
import { logout } from '@/app/actions'

type Bike = {
  model: string
  brand: string
}

async function getBikes(): Promise<Bike[]> {
  let data: Bike[] = []
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')
    if (token?.value) {
      const res = await fetch('http://127.0.0.1:8000/v1/bikes', {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      })
      data = await res.json()
    } else {
      throw new Error('Unexpected condition: No access token in cookie') // should log out?
    }
  } catch {
    // error handle here
  }

  return data
}

export default function Bikes() {
  return (
    <Suspense fallback={'loading'}>
      <BikeList />
    </Suspense>
  )
}

async function BikeList() {
  const bikes = await getBikes()

  return (
    <div>
      {bikes.map((bike) => {
        return (
          <div key={bike.model}>
            {bike.brand} {bike.model}
          </div>
        )
      })}
      <LogoutButton onClickAction={logout} />
    </div>
  )
}
