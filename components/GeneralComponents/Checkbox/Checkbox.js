import styled from "styled-components";

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
`;

export default function Checkbox({ name, value, onChange }) {
  return (
    <div>
      <CheckboxStyle
        type="checkbox"
        name={name}
        id={name}
        value={value}
        defaultChecked={true}
        onChange={onChange}
      />
    </div>
  );
}
