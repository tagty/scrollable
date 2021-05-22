import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPresentation from "app/presentations/queries/getPresentation"
import deletePresentation from "app/presentations/mutations/deletePresentation"
import { Breadcrumb } from "app/core/components/Ui"
import { Scrollable } from "app/core/components/Icons"
import styled from "styled-components"

export const Presentation = () => {
  const router = useRouter()
  const presentationId = useParam("presentationId", "number")
  const [deletePresentationMutation] = useMutation(deletePresentation)
  const [presentation] = useQuery(getPresentation, { id: presentationId })

  return (
    <>
      <Head>
        <title>{presentation.title} | scrollable</title>
      </Head>

      <div>
        <h1>{presentation.title}</h1>

        <Action>
          <Link href={Routes.EditPresentationPage({ presentationId: presentation.id })}>
            <a>Edit</a>
          </Link>

          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deletePresentationMutation({ id: presentation.id })
                router.push(Routes.PresentationsPage())
              }
            }}
            style={{ margin: "0.5rem" }}
          >
            Delete
          </button>

          <Link href={Routes.SlidesPage({ presentationId: presentation.id })}>
            <a>Slides</a>
          </Link>
        </Action>
      </div>
    </>
  )
}

const Action = styled.div`
  display: flex;
  align-items: center;
`

const Breadcrumbs = () => {
  const presentationId = useParam("presentationId", "number")
  const [presentation] = useQuery(getPresentation, { id: presentationId })

  return (
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
      <p>{presentation.title}</p>
    </Breadcrumb>
  )
}

const ShowPresentationPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumbs />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Presentation />
      </Suspense>
    </div>
  )
}

ShowPresentationPage.authenticate = true
ShowPresentationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPresentationPage
