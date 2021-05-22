import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>{title || "scrollable"}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto Sans JP"></link>
      </Head>

      {children}

      <style jsx>
        {`
          div.layout {
            padding: 15px 30px;
            font-family: "Noto Sans JP";
            color: #111111;
          }
        `}
      </style>

      <style jsx global>
        {`
          button {
            padding: 10px;
            background-color: #ffffff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }

          a {
            color: #4286ff;
            text-decoration: none;
          }
        `}
      </style>
    </div>
  )
}

export default Layout
