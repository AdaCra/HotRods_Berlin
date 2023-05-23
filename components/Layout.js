import Head from "next/head.js";
import styled from "styled-components";
import Header from "./Header";

const Main = styled.main`
  display: flex;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Hotrod-Tours-Berlin</title>
      </Head>
      <Header/>
      <Main>{children}</Main>
    </>
  );
}
