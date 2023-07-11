import styled, { css } from "styled-components";

const CheckboxStyle = styled.input`
  appearance: none;
  outline: none;
  cursor: pointer;

  &::before {
    content: "✕";
    display: inline-block;
    line-height: 30px;
    width: 32px;
    height: 32px;
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
    line-height: 30px;
    width: 32px;
    height: 32px;
    border: 2px solid var(--fontColor-highlight);
    background-color: var(--fontColor-highlight);
    text-align: center;
    font-weight: bold;
    color: var(--background);
  }
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      filter: grayscale(100%);
      opacity: 0.5;
    `}
`;

const Label = styled.label`
  /* Label styles */
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      filter: grayscale(100%);
      opacity: 0.5;
    `}
`;

export default function Checkbox({ label, name, value, onChange, disabled }) {
  return (
    <>
      <Label htmlFor={name} disabled={disabled}>
        {label}
      </Label>
      <div>
        <CheckboxStyle
          key={name}
          type="checkbox"
          name={name}
          id={name}
          value={disabled ? !value : value}
          defaultChecked={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </>
  );
}
