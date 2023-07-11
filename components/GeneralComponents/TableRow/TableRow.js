import styled, { css } from "styled-components";

const TableData = styled.td`
  width: 50%;
  padding-left: 10px;
  border: 1px solid var(--background-highlight);
  text-align: left;
  vertical-align: center;

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

const FullWidthCell = styled.td`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--background-highlight);
  text-align: center;
  vertical-align: center;

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

export default function TableRow({ keyName, keyValue, Click }) {
  return (
    <tr>
      {keyName ? (
        <>
          <TableData onClick={Click}>
            <h4>{keyName}</h4>
          </TableData>
          <TableData onClick={Click}>
            {!keyValue ? "Keine Werte angegeben" : keyValue}
          </TableData>
        </>
      ) : (
        <FullWidthCell colSpan="2" onClick={Click}>
          <h4>{keyValue}</h4>
        </FullWidthCell>
      )}
    </tr>
  );
}
