import styled from "styled-components";

export const CenterSection = styled.section`
  margin: 20px auto;
  width: 600px;
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;
export const FormInput = styled.input`
  width: 250px;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
  text-align: center;
`;

export const FormSelector = styled.select`
  width: 250px;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
  text-align: center;
`;

export const FullTextArea = styled.textarea`
  margin-top: 5px;
  padding: 5px 15px;
  width: 100%;
  background-color: var(--background);
  border: 1.5px solid var(--fontColor-highlight);
`;

export const FormButton = styled.button`
  margin: 15px auto 0px;
  padding: 0;
  height: 45px;
  line-height: 45px;
  width: 120px;
  background-color: var(--fontColor-highlight);
  color: var(--background-highlight);
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;
`;
