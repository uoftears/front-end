import React from "react";
import styled from "styled-components";
import { Button } from "./Field";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: #fff;
  height: 30px;
  text-align: center;
  width: 30px;
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285f4;
  margin: 10px 0;
  padding: 7px 10px;
`;

const Span = styled.span`
  flex-grow: 1;
`;

export default function GoogleConnectButton() {
  return (
    <StyledButton type='button' block>
      <LogoContainer>
        <Img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' />
      </LogoContainer>
      <Span>Continue With Google</Span>
    </StyledButton>
  );
}
