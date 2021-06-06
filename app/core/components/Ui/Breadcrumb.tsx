import styled from "styled-components"

const Breadcrumb = styled.div`
  display: flex;

  p {
    display: flex;
    align-items: center;
    margin: 0px;

    :not(:last-child)::after {
      content: ">";
      margin: 0px 15px;
      color: #cdc9c9;
      vertical-align: 50%;
    }

    a {
      color: #4286ff;
      text-decoration: none;
    }

    svg {
      width: 85px;
    }
  }
`

export default Breadcrumb
