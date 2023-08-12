import styled from "styled-components";

export const ChatContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  
`;

export const ChatBox = styled.div`

  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

`;

export const BotMessage = styled.div`

  background-color: #e1e1e1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;

`;

export const UserInputForm = styled.form`

  display: flex;
  align-items: center;
  gap: 10px;

`;

export const UserInput = styled.input`

  flex: 1;
  padding: 10px;
  order: none
  border: 1px solid #ccc;
  border-radius: 5px;

`;

export const SubmitButton = styled.button`

  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

`;

export const Name = styled.h1``;
