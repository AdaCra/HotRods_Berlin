import styled from "styled-components";

const FormStyled = styled.form`
    display: flex
    flex-direction:column;
    text-align: center;
    max-width:600px;
    `;
const NameInput = styled.input`
  margin: 0 auto 30px;
  height: 45px;
  line-height: 45px;
  width: 260px;
  background-color: var(--background);
  border: 2px solid var(--fontColor-highlight);
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
const NumberInput = styled.input`
  margin: auto;
  height: 45px;
  line-height: 45px;
  width: 120px;
  background-color: var(--background);
  border: 2px solid var(--fontColor-highlight);
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2em;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
const FormButton = styled.button`
  margin: auto;
  margin-left: 10px;
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
export default function BenzineForm({
  handleSubmit,
  formName,
  header,
  label,
  refill,
}) {
  return (
    <FormStyled onSubmit={handleSubmit} formName={formName}>
      <h3>{header}</h3>
      <NameInput
        type="string"
        name="name"
        id="name"
        placeholder="Ihren Name"
        minLength={3}
        maxLength={15}
        required
      /> 
      <label htmlFor="count">
        <h4>{label}</h4>
      </label>
      <br />

      <NumberInput
        type="number"
        name="count"
        id="count"
        placeholder="0"
        min={0}
        max={10}
        required
      />
      <input
        type="checkbox"
        name="isRefill"
        id="isRefill"
        defaultChecked={refill}
        value={refill}
        style={{ visibility: "hidden" }}
      />
      <FormButton type="submit">Absenden</FormButton>
    </FormStyled>
  );
}
