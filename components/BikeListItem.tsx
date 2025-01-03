import Image from 'next/image'
import Link from 'next/link'

type Props = {
  model: string
  brand: string
  nickname: string
  id: string
  imageUrl?: string
}

export const BikeListItem = ({
  imageUrl,
  id,
  nickname,
  model,
  brand,
}: Props) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="bike"
          className="rounded-lg"
          width={64}
          height={64}
        />
      )}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {nickname}
        </h2>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {brand} {model}
        </div>
        <div>
          <Link href={`/bikes/${id}`}>View bike</Link>
        </div>
      </div>
    </div>
  )
}
