import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Scrollable } from "app/core/components/Icons"
import { Breadcrumb } from "app/core/components/Ui"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Breadcrumb>
        <p>
          <Scrollable />
        </p>
      </Breadcrumb>

      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up | scrollable">{page}</Layout>

export default SignupPage
