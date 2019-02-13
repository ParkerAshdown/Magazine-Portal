import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Cbm from '@/components/Magazine/Cbm';
import Dhw from '@/components/Magazine/Dhw';
import Tbt from '@/components/Magazine/Tbt';
import Cat from '@/components/Magazine/Cat';
import Toy from '@/components/Magazine/Toy';
import Amn from '@/components/Magazine/Amn';
import Dhm from '@/components/Magazine/Dhm';
import CbmProd from '@/components/Product/Cbm';
import DhwProd from '@/components/Product/Dhw';
import TbtProd from '@/components/Product/Tbt';
import CatProd from '@/components/Product/Cat';
import ToyProd from '@/components/Product/Toy';
import AmnProd from '@/components/Product/Amn';
import DhmProd from '@/components/Product/Dhm';
import Create from '@/components/Magazine/Create';
import CreateItem from '@/components/Product/Createitems';
import Signin from '@/components/User/Signin';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/magazine/cbm',
      name: 'Bead',
      component: Cbm,
    },
    {
      path: '/magazine/dhw',
      name: 'DollsHouseWorld',
      component: Dhw,
    },
    {
      path: '/magazine/tbt',
      name: 'TeddyBearTimes',
      component: Tbt,
    },
    {
      path: '/magazine/cat',
      name: 'CatWorld',
      component: Cat,
    },
    {
      path: '/magazine/toy',
      name: 'ToySoldier',
      component: Toy,
    },
    {
      path: '/magazine/amn',
      name: 'AmericanMiniaturist',
      component: Amn,
    },
    {
      path: '/magazine/dhm',
      name: 'DollhouseMiniatures',
      component: Dhm,
    },
    {
      path: '/product/cbm',
      name: 'Bead',
      component: CbmProd,
    },
    {
      path: '/product/dhw',
      name: 'DollsHouseWorld',
      component: DhwProd,
    },
    {
      path: '/product/tbt',
      name: 'TeddyBearTimes',
      component: TbtProd,
    },
    {
      path: '/product/cat',
      name: 'CatWorld',
      component: CatProd,
    },
    {
      path: '/product/toy',
      name: 'ToySoldier',
      component: ToyProd,
    },
    {
      path: '/product/amn',
      name: 'AmericanMiniaturist',
      component: AmnProd,
    },
    {
      path: '/product/dhm',
      name: 'DollhouseMiniatures',
      component: DhmProd,
    },
    {
      path: '/user/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/magazine/create',
      name: 'Create',
      component: Create,
      beforeEnter: AuthGuard,
    },
    {
      path: '/product/createItem',
      name: 'CreateItem',
      component: CreateItem,
      beforeEnter: AuthGuard,
    },
  ],
  mode: 'history',
});
