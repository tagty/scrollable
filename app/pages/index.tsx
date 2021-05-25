import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Scrollable } from "app/core/components/Icons"
import { Breadcrumb, AButton } from "app/core/components/Ui"
import styled from "styled-components"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </>
    )
  } else {
    return (
      <Action>
        <Link href={Routes.SignupPage()}>
          <AButton>Sign Up</AButton>
        </Link>
        <Link href={Routes.LoginPage()}>
          <AButton>Login</AButton>
        </Link>
      </Action>
    )
  }
}

const Action = styled.div`
  > *:not(:last-child) {
    margin-right: 8px;
  }
`

const Home: BlitzPage = () => {
  return (
    <div>
      <Breadcrumb>
        <p>
          <Scrollable />
        </p>
      </Breadcrumb>

      <p>
        <Link href={Routes.PresentationsPage()}>
          <a>Presentations</a>
        </Link>
      </p>

      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home | scrollable">{page}</Layout>

export default Home
