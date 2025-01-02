import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { LogoutButton, BikeListItem } from '@/components'
import { logout } from '@/app/actions'

type Bike = {
  model: string
  brand: string
  nickname: string
  id: string
}

type ResultsWrapper<T> = {
  results: T[]
  count: number
}

async function getBikes(): Promise<ResultsWrapper<Bike>> {
  let data: ResultsWrapper<Bike> = { results: [], count: 0 }
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
    throw new Error('Unexpected condition: Could not get bikes')
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
      {bikes.results.map((bike) => {
        return (
          <BikeListItem
            key={bike.id}
            model={bike.model}
            brand={bike.brand}
            nickname={bike.nickname}
            id={bike.id}
          />
        )
      })}
      <LogoutButton onClickAction={logout} />
    </div>
  )
}
