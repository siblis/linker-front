import Home from 'components/Home';
import Collection from 'components/Collection';

export default [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/collection/:hash?',
        component: Collection,
        exact: true
    },
]
