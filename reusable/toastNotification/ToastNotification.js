import React, { Component } from 'react'
// import userImg from './ToastNotificationMedia/user.png'
// import closeIcon from './ToastNotificationMedia/close.png'
// import successImg from './ToastNotificationMedia/success.png'
// import warningImg from './ToastNotificationMedia/warning.png'
// import errorImg from './ToastNotificationMedia/error.png'
// import infoImg from './ToastNotificationMedia/info.png'

export const notify = (notification) => {
    window.notificationToast && window.notificationToast.pushNewNotification(notification)
}

export const NotificationContainer = () => {
    return <ToastNotification ref={(notificationToast) => { window.notificationToast = notificationToast }} />
}

class ToastNotification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newNotificationList: [],
        }
    }

    pushNewNotification = (newNotification) => {
        this.setState({ newNotificationList: [...this.state.newNotificationList, { ...newNotification, id: Math.floor(Math.random() * 100000) }] })
    }

    deleteNotification = (deletedNotificataion) => {
        document.getElementById(deletedNotificataion.id) && document.getElementById(deletedNotificataion.id).classList.add('deleteAnimation');
        setTimeout(() => {
            document.getElementById(deletedNotificataion.id) && document.getElementById(deletedNotificataion.id).remove()
        }, 250);
    }

    animationEnd = (deletedNotificataion) => {
        document.getElementById(deletedNotificataion.id) && document.getElementById(deletedNotificataion.id).remove()
    }

    ToastNotificationBody = () => {
        console.log('state', this.state)
        return (
            <>
                {
                    this.state.newNotificationList.map((notification) => {

                        return (
                            <div className={`toastNotificationBody ${notification.type}`} id={notification.id} onAnimationEnd={(e) => {
                                console.log(e);
                                if (e.animationName == 'slideOutAnimation') {
                                    this.animationEnd(notification);
                                }
                            }}
                                onClick={() => { notification.onClick && notification.onClick() }}
                            >
                                <div className='toastNotificationBody__imgCont'>

                                    {notification.icon != 'disabled' && <img height='100%' src={
                                        (notification.type === 'success' && '/assets/ToastNotificationMedia/success.png') ||
                                        (notification.type === 'warning' && '/assets/ToastNotificationMedia/warning.png') ||
                                        (notification.type === 'error' && '/assets/ToastNotificationMedia/error.png') ||
                                        ('/assets/ToastNotificationMedia/info.png')
                                    }
                                    />
                                    }
                                </div>
                                <div className='toastNotificationBody__notiBodyContainer'>
                                    <h4 className='toastNotificationBody__notiBodyContainer__notiHeader'>{notification.header}</h4>
                                    <div className='toastNotificationBody__notiBodyContainer__notiBody'>{notification.body}</div>
                                </div>

                                <div className='toastNotificationBody__closeBtn' onClick={() => { this.deleteNotification(notification) }}><img height='50%' src={'/assets/ToastNotificationMedia/close.png'} /></div>
                            </div>
                        )
                    })
                }
            </>
        )

    }

    render() {
        return (
            <div className='toastNotificationHome'>
                {this.ToastNotificationBody()}
            </div>
        )
    }
}
