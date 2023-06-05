const { default: styled } = require("styled-components");

const CenteredSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;

export default function H2TextPopUp({ text }) {
  <CenteredSection>
    <h2>{text}</h2>
  </CenteredSection>;
}
