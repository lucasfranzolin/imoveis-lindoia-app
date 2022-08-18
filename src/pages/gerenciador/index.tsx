import { ManagerHome } from '../../components/manager/ManagerHome';

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    };
}

export default ManagerHome;
