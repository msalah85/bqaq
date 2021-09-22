import "../sass/main.scss"
import "react-multi-carousel/lib/styles.css";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import "react-multi-carousel/lib/styles.css";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import '../reusable/toastNotification/ToastNotificationBody.css'
import React, { useEffect } from 'react';
import { wrapper } from "../redux/store";
import SignInPopup from '../components/signIn_signUp_form/SignInPopup';
import { connect } from "react-redux";
import { SIGNIN_WITH_LOCAL_STORAGE } from '../redux/actions/registration/index';
import FloatingShare from '../reusable/floatingShare/FloatingShare';
import FullPageSpinner from '../reusable/fullPageSpinner/fullPageSpinner';
import Footer from '../reusable/footer/Footer';
import { NotificationContainer, notify } from '../reusable/toastNotification/ToastNotification'
import Head from 'next/head'
import requester from "../requester/requester";

function MyApp({ Component, pageProps, SIGNIN_WITH_LOCAL_STORAGE, showSigninPoopup, showLoader }) {

  useEffect(() => {
    incrementVisitor();
    SIGNIN_WITH_LOCAL_STORAGE();
  }, []);


  function incrementVisitor() {

    let visitedBefore = window.localStorage.getItem('visitedBefore');

    if (!visitedBefore) {
      requester
        .post('/statistics/visit')
        .then(() => {
          window.localStorage.setItem('visitedBefore', true)
        })
    }

  }

  return (
    <>
      <Head>
        <title>بقيق</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="shortcut icon" href="/assets/android-icon-192x192.png" />
        <meta name="thumbnail" content="/assets/android-icon-192x192.png" />

        <link rel="apple-touch-icon" sizes="57x57" href="/assets/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />

        {/* <link rel="manifest" href="/assets/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/assets/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" /> */}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://baqiq.vercel.app/" />
        <meta property="og:title" content="بقيق" />
        <meta property="og:description" content="جمعية الدعوه ببقيق" />
        <meta property="og:image" itemProp="image" content="/assets/android-icon-192x192.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://baqiq.vercel.app/" />
        <meta property="twitter:title" content="بقيق" />
        <meta property="twitter:description" content="جمعية الدعوه ببقيق" />
        <meta property="twitter:image" content="/assets/android-icon-192x192.png" />

      </Head>

      {showSigninPoopup && <SignInPopup />}
      {showLoader && <FullPageSpinner />}
      <NotificationContainer />
      {/* <button onClick={() => { notify({ body: 'asdjhbgSFjkhakjsfhdkasdhdfi; kfh kwhf wihf kwhf iH KLUHF BF  KHWAFH kHSF KLAHF KHF AHWEF AF AH FLGF AJG LAGHFKA GAH ', type: 'error' }) }}>send error notificataion</button>
      <button onClick={() => { notify({ body: 'asdjhbgSFjkhakjsfhdkasdhdfi; kfh kwhf wihf kwhf iH KLUHF BF  KHWAFH kHSF KLAHF KHF AHWEF AF AH FLGF AJG LAGHFKA GAH ', header: 'Icon Disabled', type: '', icon: 'disabled' }) }}>send Icon Disabled notificataion</button>
      <button onClick={() => { notify({ body: Date.now(), header: 'Icon Disabled', type: 'success' }) }}>send success notificataion</button>

      <button onClick={() => { notify({ body: Date.now(), header: 'Header', type: 'warning' }) }}>send warning notificataion</button>
      <button onClick={() => { notify({ body: Date.now(), header: 'Header', type: 'info' }) }}>send info notificataion</button>
      <button onClick={() => { notify({ body: Date.now(), header: 'Header' }) }}>send default notificataion</button> */}


      <Component {...pageProps} />
      <FloatingShare />
      <Footer />

    </>
  )
}
const mapStateToProps = (state) => {
  return { showSigninPoopup: state.authorization?.showSigninPopup, showLoader: state.spinner };
};
export default wrapper.withRedux(connect(mapStateToProps, { SIGNIN_WITH_LOCAL_STORAGE })(MyApp));