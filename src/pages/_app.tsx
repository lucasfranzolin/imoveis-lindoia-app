import '../styles/globals.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import { useEffectOnce } from '../hooks/useEffectOnce';

function MyApp({ Component, pageProps }: AppProps) {
    useEffectOnce(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();

        Router.events.on('routeChangeStart', handleRouteStart);
        Router.events.on('routeChangeComplete', handleRouteDone);
        Router.events.on('routeChangeError', handleRouteDone);

        return () => {
            Router.events.off('routeChangeStart', handleRouteStart);
            Router.events.off('routeChangeComplete', handleRouteDone);
            Router.events.off('routeChangeError', handleRouteDone);
        };
    });

    return <Component {...pageProps} />;
}

export default MyApp;
