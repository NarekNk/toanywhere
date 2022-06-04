import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Message = ({ message: { messageText, func, backTo }, resolve }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  if (!open) return;

  return (
    <Mess>
      <Btn onClick={() => setOpen(false)}>
        <AiOutlineCloseCircle />
      </Btn>
      <p>{messageText}</p>
      <div className="messageBtns">
        <button
          onClick={() => {
            resolve(null, null, null);
            func();
          }}
        >
          Еще раз
        </button>
        <button
          onClick={() => {
            navigate(backTo);
            resolve(null, null, null);
          }}
        >
          Отменить
        </button>
      </div>
    </Mess>
  );
};

const Btn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;

  color: #777;
`;
const Mess = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.95;
  font-size: 16px;

  width: 300px;
  min-height: 150px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 30px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 0 0 10px 5px #ddd;
  z-index: 1000;
  background: white;

  .messageBtns {
    display: flex;
    margin-top: 20px;
    button {
      border: 1px solid black;
      margin: 0 10px;
      padding: 5px 10px;
      border-radius: 10px;
    }
  }
`;

export default Message;
