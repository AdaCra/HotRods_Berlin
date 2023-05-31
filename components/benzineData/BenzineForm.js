import styled from "styled-components";

  const FormStyled = styled.form`
    display: flex
    flex-direction:column;
    text-align: center;
    width:600px;
    `;
  const FormInput = styled.input`
    margin: auto;
    height: 45px;
    line-height: 45px;
    width: 120px;
    background-color:  var(--background);
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
export default function BenzineForm({ handleSubmit, formName, header, label }) {

  return (
    <FormStyled onSubmit={handleSubmit} formName={formName}>
      <h3>{header}</h3>
      <label htmlFor={formName}>
        <h4>{label}</h4>
      </label>
      <br />
      <FormInput
        type="number"
        name="count"
        id={formName}
        placeholder="0"
        min={0}
      />
      <FormButton type="submit">Absenden</FormButton>
    </FormStyled>
  );
}
