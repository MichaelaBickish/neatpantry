import { authGuard } from '@bcwdev/auth0provider-client'
import { createRouter, createWebHashHistory } from 'vue-router'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  // {
  //   path: '/shelves',
  //   name: 'PantryPage',
  //   component: loadPage('PantryPage'),
  //   beforeEnter: authGuard
  // }
  // {
  //   path: '/:id/shelves',
  //   name: 'PantryPage',
  //   component: loadPage('PantryPage'),
  //   beforeEnter: authGuard
  // }
  //   path: '/shelves/:id',
  //   name: 'ShelfDetailsPage',
  //   component: loadPage('ShelfDetailsPage'),
  //   beforeEnter: authGuard
  // }
  {
    path: '/pantrypage/:id',
    name: 'PantryPage',
    component: loadPage('PantryPage'),
    // Name of the vue file we're going to
    beforeEnter: authGuard
  },
  {
    path: '/households/',
    name: 'HouseholdsPage',
    component: loadPage('HouseholdsPage'),
    // Name of the vue file we're going to
    beforeEnter: authGuard
  },
  {
    path: 'household/:id/shoppingList',
    name: 'HouseholdShoppingListPage',
    component: loadPage('HouseholdShoppingListPage'),
    // Name of the vue file we're going to
    beforeEnter: authGuard
  },
  {
    path: '/households/:id/members',
    name: 'HouseholdMembersPage',
    component: loadPage('HouseholdMembersPage'),
    // Name of the vue file we're going to
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    // Name of the vue file we're going to
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
