import styled from 'styled-components';
import { motion } from 'framer-motion';

export const NotificationContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #f0f0f0;
  padding: 10px 0;
`;

export const NotificationList = styled(motion.div)`
  display: flex;
  white-space: nowrap;
  /* padding-left: 100%; Removed to start from the right */
`;

export const NotificationItem = styled.div`
  padding: 10px 20px;
  border-right: 1px solid #ccc;
`;

export const Slider = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background-color: blue;
`;