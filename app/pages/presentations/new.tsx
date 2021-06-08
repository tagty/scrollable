import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPresentation from "app/presentations/mutations/createPresentation"
import { PresentationForm, FORM_ERROR } from "app/presentations/components/PresentationForm"
import { Breadcrumb } from "app/core/components/Ui"
import { Scrollable } from "app/core/components/Icons"

const NewPresentationPage: BlitzPage = () => {
  const router = useRouter()
  const [createPresentationMutation] = useMutation(createPresentation)

  return (
    <div>
      <Breadcrumb>
        <p>
          <Link href={Routes.Home()}>
            <a>
              <Scrollable />
            </a>
          </Link>
        </p>
        <p>
          <Link href={Routes.PresentationsPage()}>
            <a>Presentations</a>
          </Link>
        </p>
        <p>Create</p>
      </Breadcrumb>

      <PresentationForm
        submitText="Create"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePresentation}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const presentation = await createPresentationMutation(values)
            router.push(`/presentations/${presentation.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewPresentationPage.authenticate = true
NewPresentationPage.getLayout = (page) => (
  <Layout title={"Create New Presentation | scrollable"}>{page}</Layout>
)

export default NewPresentationPage
