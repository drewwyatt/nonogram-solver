import type { FC } from 'react'

const IndexPage: FC = () => (
  <>
    <main>
      <h1>UI Stuff Goes Here</h1>
    </main>
    <style jsx global>{`
      html,
      body,
      #__next {
        height: 100%;
        min-height: 100%;
        background: #333;
        color: #fff;
      }

      main {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100%;
        width: 100%;
      }

      h1 {
        text-align: center;
      }
    `}</style>
  </>
)

export default IndexPage
