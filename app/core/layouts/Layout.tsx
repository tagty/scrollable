import { ReactNode } from "react"
import { Head } from "blitz"
import styled from "styled-components"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Container>
      <Head>
        <title>{title || "scrollable"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </Container>
  )
}

const Container = styled.div`
  padding: 15px 30px;
  font-family: "Noto Sans JP";
  color: #111111;
`

export default Layout
