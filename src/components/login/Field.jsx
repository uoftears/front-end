import React from 'react';
import styled from 'styled-components';

// props: type, error, value, onChange, placeholder ...rest

const Wrapper = styled.div`
  position: relative;
  margin: 20px 0;
  &::after{
    display: ${props => props.isInvalid ? 'block' : 'none'};
    font-family: "Font Awesome 5 Pro";
    font-weight: 900;
    content: '\f069';
    position: absolute;
    right: 0;
    font-size: 15px;
    color: #dc3545;
    transform: translate(-70%,-150%);
  }
`;

const Label = styled.div`
  font-weight: bold;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${props => props.isInvalid ? '#dc3545' : '#ced4da'};
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  &:focus{
    outline: 0;
    color: #495057;
    background-color: #fff;
    border-color: ${props => props.isInvalid ? '#dc3545' : '#80bdff'};
  }
`;

const Error = styled.div`
  position: absolute;
  margin-top: 0;
  width: 100%;
  font-size: 12px;
  color: #dc3545;
`

function Field ({ label, type, error, value, onChange, placeholder, ...rest }) {
  const isInvalid = Boolean(error);
  return (
    <Wrapper isInvalid={isInvalid}>
      {Boolean(label) && <Label>{label}</Label>}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        placeholder={placeholder}
        {...rest}
      />
      {Boolean(error) && <Error>{error}</Error>}
    </Wrapper>
  )
}

export default Field;

export const Title = styled.div`
  text-align: center;
`

export const ForgetPass = styled.button`
    background: transparent;
    border: none;
    font-size: 14px;
    position: absolute;
    right: 0;
    transform: translate(-40%, -20px);

    &:focus{
      outline: none;
    }

    &:hover{
      color: #0056b3;
    }
`

export const Button = styled.button`
    display: ${props => props.block !== undefined ? 'block' : 'inline-block'};
    width: ${props => props.block !== undefined ? '100%' : ''};
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &:focus{
      outline: none;
    }
    &:hover{
      background-color: #0069d9;
      border-color: #0062cc;
    }
`

export const Form = styled.form`
  max-width: 600px; 
  margin: auto;
  padding: 50px;
  position: relative;
`;