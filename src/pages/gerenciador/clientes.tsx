import { Customers } from '../../components/manager/Customers';

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    };
}

export default Customers;
