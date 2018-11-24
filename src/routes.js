import Home from 'components/Home';
import Collection from 'components/Collection';
import Cabinet from 'components/Cabinet';

export default [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/cabinet',
        component: Cabinet,
        exact: true
    },
    {
        path: '/collection/:hash?',
        component: Collection,
        exact: true
    },
]
