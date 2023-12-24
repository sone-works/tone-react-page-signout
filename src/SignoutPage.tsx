import ToneServiceApi from '@sone-dao/tone-react-api'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

type SignoutPageProps = {
  useUserStore: UseUserStore
}

export default function SignoutPage({ useUserStore }: SignoutPageProps) {
  const [count, { startCountdown }] = useCountdown({
    countStart: 5,
    intervalMs: 1000,
  })

  const api = new ToneServiceApi()

  const router = useRouter()

  useEffect(() => {
    startCountdown()
  }, [])

  count == 0 && signoutUser()

  return (
    <main className="flex items-center justify-center bg-global min-h-screen h-full p-4">
      <div className="p-4 rounded-xl bg-global-flipped text-global-flipped flex flex-col items-center w-full">
        <i className="fa-solid fa-hand-wave text-8xl" />
        <p className="mt-4 p-2 font-content">Thanks for stopping by!</p>
        <p className="mt-2">
          Signing you out{' '}
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
    </main>
  )

  async function signoutUser() {
    return api.user
      .signoutUser()
      .then((response) => {
        console.log({ response })

        localStorage.removeItem('tone.session')

        useUserStore.setState({}, true)

        deleteCookie('tone.session')

        router.push('/')
      })
      .catch((error) => {
        console.log({ error })
      })
  }
}
