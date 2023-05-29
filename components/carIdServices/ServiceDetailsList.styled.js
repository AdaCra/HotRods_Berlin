import styled from "styled-components";

export const ServiceTableSection = styled.section`
  display: flex;
  gap: 20px;
`;

export const ServiceH4 = styled.h4`
  margin: 30px 0;
  font-weight: bold;
  color: var(--fontColor-highlight);
`;

export const ServiceTableStyle = styled.table`
  width: 150px;
`;
export const ServiceTH = styled.th`
  background-color: var(--background-highlight);
`;

export const ServiceDetailBody = styled.tbody``;

export const ServiceTableData = styled.td`
  width: 120px;
  border: 1px solid var(--background-highlight);
  color: var(--fontColor-body);
  text-align: center;
`;
export const ServiceTableBool = styled.td`
  width: 30px;
  border: 1px solid var(--background-highlight);
  color: var(--fontColor-body);
  padding-left: 5px;
`;
