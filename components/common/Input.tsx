import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div<{ iconExist: boolean }>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px " : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }
  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`;

//? <input> 태그가 가지는 속성들에 대한 타입
//? extends를 사용하여 IProps는 <input> 태그가 가지는 속성을 확장하여 사용하게 됨.
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  //? 타입이 JSX 엘리먼트인 icon을 받지 않을 수도, undefined일 수도 있다는 것을 의미
  icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <Container iconExist={!!icon}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </Container>
  );
};

export default Input;
