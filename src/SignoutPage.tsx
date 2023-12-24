import ToneServiceApi from '@sone-dao/tone-react-api'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCountdown, useInterval } from 'usehooks-ts'

type SignoutPageProps = {
  useUserStore: UseUserStore
}

export default function SignoutPage({ useUserStore }: SignoutPageProps) {
  const [handFlip, setHandFlip] = useState<boolean>(false)
  const [count, { startCountdown }] = useCountdown({
    countStart: 5,
    intervalMs: 1000,
  })

  useInterval(() => {
    setHandFlip(!handFlip)
  }, 500)

  const api = new ToneServiceApi()

  const router = useRouter()

  useEffect(() => {
    !localStorage.getItem('tone.session') && router.push('/')

    startCountdown()
  }, [])

  count == 0 && signoutUser()

  return (
    <main className="flex items-center justify-center bg-global min-h-screen h-full p-4">
      <div className="flex flex-col items-center w-full max-w-xl">
        <span className="font-release text-global text-5xl m-4">tone</span>
        <div className="p-4 rounded-xl bg-global-flipped text-global-flipped flex flex-col items-center w-full">
          <p className="p-2 font-content">
            Thanks for stopping by!
            <i
              className="fa-fw fa-solid fa-hand-wave ml-1"
              style={{ transform: handFlip ? 'scaleX(-1)' : '' }}
            />
          </p>
          <p className="mt-2 font-content">
            We're signing you out{' '}
            {count ? (
              <>
                in {count} second
                {count > 1 && 's'}...
              </>
            ) : (
              <>now...</>
            )}
          </p>
        </div>
      </div>
    </main>
  )

  async function signoutUser() {
    return api.user
      .signoutUser()
      .then((response) => {
        localStorage.removeItem('tone.session')

        useUserStore.setState({}, true)

        deleteCookie('tone.session')

        router.push('/')
      })
      .catch((error) => {})
  }
}
