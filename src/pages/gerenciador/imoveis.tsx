import { Properties } from '../../components/manager/Properties';

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    };
}

export default Properties;
