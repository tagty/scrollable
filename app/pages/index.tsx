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
        <Link href={Routes.LoginPage()}>
          <AButton>Login</AButton>
        </Link>
        <Link href={Routes.SignupPage()}>
          <AButton>Sign Up</AButton>
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

const Header = () => {
  return (
    <HeaderContainer>
      <Breadcrumb>
        <p>
          <Scrollable />
        </p>
      </Breadcrumb>
      <UserInfo />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>

      <Main>
        <p>Convert markdown to</p>
        <p>
          <Scrollable /> presentation slides
        </p>
      </Main>

      <P>
        <Link href={Routes.PresentationsPage()}>
          <a>Show all presentations</a>
        </Link>
      </P>
    </div>
  )
}

const P = styled.p`
  text-align: center;

  a {
    border: 2px solid;
    border-radius: 6px;
    padding: 10px;
    color: #111111;
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 35px;
  margin-top: 50px;
  margin-bottom: 70px;

  p {
    display: flex;
    align-items: flex-end;
    margin-block: 30px;

    svg {
      margin-right: 10px;
    }
  }
`

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home | scrollable">{page}</Layout>

export default Home
