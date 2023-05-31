
import styled from "styled-components";
import { CheckboxStyle } from "./Checkbox.style";

export default function Checkbox({name, onChange}) {

  return (
    <div>
      <CheckboxStyle type="checkbox" name={name} id={name} defaultChecked={true} onChange={onChange}/>
    </div>
  );
}
