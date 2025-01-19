import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNotification } from '../store/actions';

const Notification = () => {
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                dispatch(setNotification(null));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);

    if (!notification || notification.message === null) return null;

    const bgColor = notification.type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-15 right-4 ${bgColor} text-white px-6 py-3 rounded shadow-lg`}>
            {notification.message}
        </div>
    );
};

export default Notification;
