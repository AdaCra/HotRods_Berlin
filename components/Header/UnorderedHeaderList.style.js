import styled from "styled-components";

export const LinkList = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  text-decoration: none;
  list-style: none;
  font-size: 1.5em;
  width: 70%;
  margin: auto;
  text-align: center;
  z-index: 1;
  @media (max-width: 750px) {
    font-size: 1.2em;
  }
  @media (max-width: 390px) {
    font-size: 1em;
  }
`;

export const ListItem = styled.li`
cursor: pointer;
  font-family: "Roboto Condensed", Helvetica, Arial, Verdana, sans-serif;
  font-weight: bold;
  font-size: 24px
  margin: 0;
  padding: 10px 20px;;
  border: 1px solid var(--fontColor-body);
  border-style: none solid;
  width: 100%;
  &:hover {
    color: var(--fontColor-highlight);
    background-color: var(--background-highlight);
    border: 2px solid var(--fontColor-highlight);
    border-style: none solid;
  }
  &:click {
    color: var(--fontColor-highlight);
    background-color: var(--background-highlight);
    border: 2px solid var(--fontColor-highlight);
    border-style: none solid;
  }
  @media (max-width: 750px) {
         padding: 5px 10px;
      }
  @media (max-width: 550px) {
         padding: 5px 5px;
      }
  @media (max-width: 390px) {
         padding: 4px 5px;
      }
`;
export const ListLogo = styled.li`
  margin: 0;
  flex-shrink: 0;
`;
// @media (max-width: 750px) {
//     padding: 10px 15px;
//   }
