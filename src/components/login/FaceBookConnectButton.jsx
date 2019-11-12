import React from "react";
import styled from "styled-components";
import { Button } from "./Field";

const Icon = styled.i`
  font-family: "Font Awesome 5 Brands";
  font-size: 1.5rem;
  &::before {
    content: "\f09a";
    color: #fff;
    font-style: normal;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4267b2;
  margin: 10px 0;
  padding: 0 10px;
`;

const Span = styled.span`
  flex-grow: 1;
`;

export default function FaceBookConnectButton({ onClick }) {
  return (
    <StyledButton type='button' block onClick={onClick}>
      <Icon /> <Span>Continue With Facebook</Span>
    </StyledButton>
  );
}
