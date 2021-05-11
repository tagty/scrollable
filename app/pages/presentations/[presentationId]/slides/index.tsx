import { Suspense, useCallback, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from "blitz"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import SyntaxHighlighter from "react-syntax-highlighter"
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs"
import Layout from "app/core/layouts/Layout"
import getSlides from "app/slides/queries/getSlides"

const ITEMS_PER_PAGE = 1

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "")
    return !inline && match ? (
      <SyntaxHighlighter
        style={githubGist}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    )
  },
}

export const SlidesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const presentationId = useParam("presentationId", "number")
  const [{ slides, hasMore }] = usePaginatedQuery(getSlides, {
    where: { presentation: { id: presentationId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({ query: { presentationId: presentationId, page: page - 1 } })
  const goToNextPage = () =>
    router.push({ query: { presentationId: presentationId, page: page + 1 } })

  const onKeydown = useCallback(
    (event) => {
      if (hasMore && (event.key === "ArrowRight" || event.key === "Enter")) {
        goToNextPage()
      } else if (page !== 0 && (event.key === "ArrowLeft" || event.key === "Backspace")) {
        goToPreviousPage()
      }
    },
    [hasMore, page]
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeydown, false)

    return () => {
      document.removeEventListener("keydown", onKeydown, false)
    }
  }, [hasMore, page])

  return (
    <div>
      {slides.map((slide) => (
        <Div key={slide.id}>
          <ReactMarkdown components={components} children={slide.text} />
        </Div>
      ))}

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const Div = styled.div`
  img {
    max-width: 800px;
  }
`

const SlidesPage: BlitzPage = () => {
  const presentationId = useParam("presentationId", "number")

  return (
    <>
      <Head>
        <title>Slides</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.PresentationsPage()}>
            <a>Presentations</a>
          </Link>
        </p>

        {presentationId && (
          <p>
            <Link href={Routes.ShowPresentationPage({ presentationId: presentationId })}>
              <a>Presentation {presentationId}</a>
            </Link>
          </p>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          <SlidesList />
        </Suspense>
      </div>
    </>
  )
}

SlidesPage.authenticate = true
SlidesPage.getLayout = (page) => <Layout>{page}</Layout>

export default SlidesPage
