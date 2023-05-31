import styled from "styled-components";

export const CheckboxStyle = styled.input`
  appearance: none;
  outline: none;
  cursor: pointer;

  &::before {
    content: "✕";
    display: inline-block;
    line-height: 25px;
    width: 25px;
    height: 25px;
    border: 2px solid var(--fontColor-highlight);
    text-align: center;
    font-weight: bold;
    color: var(--fontColor-highlight);
  }

  &:checked::before {
    visibility: hidden;
  }

  &:checked::after {
    content: "✓";
    display: inline-block;
    line-height: 25px;
    width: 25px;
    height: 25px;
    border: 2px solid var(--fontColor-highlight);
    background-color: var(--fontColor-highlight);
    text-align: center;
    font-weight: bold;
    color: var(--background);
  }
`;
