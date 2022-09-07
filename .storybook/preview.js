import '../src/styles/globals.css';
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    breakpoints: {
        breakpointNames: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536,
        },
    },
};
