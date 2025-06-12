import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; /* Adjust as needed */
  background-color: #f4f4f4; /* Optional background */
`;

export const Cogwheel = styled.div`
  border: 4px solid #333;
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: ${rotate} ${props => props.speed}s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: #333;
    border-radius: 2px;
  }

  &::before {
    width: ${props => props.size / 4}px;
    height: 4px;
  }

  &::after {
    width: 4px;
    height: ${props => props.size / 4}px;
  }

  &:nth-child(1) {
    font-size: ${props => props.size / 3}px;
    color: #eee;
  }
`;

export const CogInner = styled.div`
  width: ${props => props.size / 3}px;
  height: ${props => props.size / 3}px;
  background-color: #555;
  border-radius: 50%;
`;