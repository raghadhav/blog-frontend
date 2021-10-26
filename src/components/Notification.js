import React from 'react'
import { useSelector } from 'react-redux';

const Notification = (props) => {

    const notif = useSelector(state => state.notification);
    if (notif.text === "") return null;
    else return <div style={{ color: notif.theme }} id="notifClass"> {notif.text}</div>;
};

export default Notification;

// 1. addNewBlog
// 2. showMsg