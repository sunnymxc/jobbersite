import React, { useEffect, useRef, useState } from 'react'; // Import useState
import { useQuery } from 'react-query';
import NotificationService from '../../services/notifications/NotificationService';
import {
  NotificationContainer,
  NotificationList,
  NotificationItem,
  Slider,
} from './NotificationElements'; // Assuming your styles are in './NotificationStyles.js'
import { useMotionValue } from 'framer-motion';

const NotificationComponent = () => {
  const { data: response, isLoading, isError, error } = useQuery(
    'notifications',
    NotificationService.getAll,
    {
      refetchOnWindowFocus: false,
    }
  );

  const notifications = response?.data;
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0); // State to hold contentWidth

  useEffect(() => {
    console.log('useEffect triggered. notifications:', notifications);
    console.log('containerRef.current:', containerRef.current);
    console.log('containerWidth:', containerRef.current?.offsetWidth);

    if (containerRef.current && notifications && notifications.length > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const calculatedContentWidth = notifications.reduce((acc, notif) => {
        const tempElem = document.createElement('div');
        tempElem.style.visibility = 'hidden';
        tempElem.style.position = 'absolute';
        tempElem.style.whiteSpace = 'nowrap';
        tempElem.innerHTML = notif.message || notif.title || `Notification ${notif.id}`;
        document.body.appendChild(tempElem); // Append to measure width
        const width = tempElem.offsetWidth;
        document.body.removeChild(tempElem); // Remove after measuring
        return acc + width + 20; // Add item width + some spacing
      }, 0);

      console.log('contentWidth:', calculatedContentWidth);
      console.log('containerWidth:', containerWidth);
      setContentWidth(calculatedContentWidth); // Update the state

      if (calculatedContentWidth > 0 && containerWidth > 0) {
        console.log('Animating x for infinite left scroll...');
        const animationDuration = calculatedContentWidth / 50; // Adjust speed

        x.start(0); // Start from the right edge (initial position)

        x.animate({
          from: 0,
          to: -calculatedContentWidth, // Scroll the entire content width to the left
          transition: {
            duration: animationDuration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          },
          onComplete: () => {
            // Immediately reset to the right to create the loop
            x.set(0);
            x.start({ from: 0, to: -calculatedContentWidth, transition: { duration: animationDuration, ease: 'linear', repeat: Infinity, repeatType: 'loop' } });
          },
        });
      } else {
        x.set(0); // Reset if no content or container width
      }
    } else {
      setContentWidth(0); // Reset contentWidth if no notifications
      x.set(0);
    }
  }, [notifications, x]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const notificationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const sliderVariants = {
    initial: { width: 0 },
    animate: {
      width: '100%',
      transition: {
        duration: 5, // Adjust slider duration independently
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  if (isError) {
    return <div>Error fetching notifications: {error.message}</div>;
  }

  if (!Array.isArray(notifications) || notifications.length === 0) {
    return <div>No notifications available.</div>;
  }

  return (
    <NotificationContainer ref={containerRef}>
      <Slider
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      />
      <NotificationList
        style={{
          x, // The framer-motion animated value
          width: `${contentWidth}px`, // Use the state variable
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ type: 'tween', duration: 0.5 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} variants={notificationVariants}>
            <div dangerouslySetInnerHTML={{ __html: notification.message }} />
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationContainer>
  );
};

export default NotificationComponent;