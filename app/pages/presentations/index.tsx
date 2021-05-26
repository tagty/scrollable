import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPresentations from "app/presentations/queries/getPresentations"
import { Breadcrumb } from "app/core/components/Ui"
import { Scrollable } from "app/core/components/Icons"
import styled from "styled-components"

const ITEMS_PER_PAGE = 100

export const PresentationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ presentations, hasMore }] = usePaginatedQuery(getPresentations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Table>
        {presentations.map((presentation) => (
          <div key={presentation.id} className="row">
            <Link href={Routes.ShowPresentationPage({ presentationId: presentation.id })}>
              <a>{presentation.title}</a>
            </Link>

            <Link href={Routes.EditPresentationPage({ presentationId: presentation.id })}>
              <a>Edit</a>
            </Link>

            <Link href={Routes.SlidesPage({ presentationId: presentation.id })}>
              <a>Slides</a>
            </Link>
          </div>
        ))}
      </Table>

      <Buttons>
        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </Buttons>
    </div>
  )
}

const Table = styled.div`
  margin-bottom: 35px;

  > div.row {
    display: flex;
    align-items: center;
    padding: 10px 0px;

    > *:not(:last-child) {
      margin-right: 20px;
    }
  }
`

const Buttons = styled.div`
  button:not(:last-child) {
    margin-right: 8px;
  }
`

const PresentationsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Presentations | scrollable</title>
      </Head>

      <div>
        <Breadcrumb>
          <p>
            <Link href={Routes.Home()}>
              <a>
                <Scrollable />
              </a>
            </Link>
          </p>
        </Breadcrumb>

        <p>
          <Link href={Routes.NewPresentationPage()}>
            <a>Create Presentation</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PresentationsList />
        </Suspense>
      </div>
    </>
  )
}

PresentationsPage.authenticate = true
PresentationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PresentationsPage
