import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Scrollable } from "app/core/components/Icons"
import { Breadcrumb } from "app/core/components/Ui"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Breadcrumb>
        <p>
          <Scrollable />
        </p>
      </Breadcrumb>

      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In | scrollable">{page}</Layout>

export default LoginPage
