import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AuthService } from '@/services/AuthService';
import Home from '../views/Home.vue';
import Library from '../views/Library/Library.vue';
import LibraryListing from '../views/Library/LibraryListing.vue';
import LibraryGenreListing from '../views/Library/LibraryGenreListing.vue';
import LibraryEntityDetails from '@/views/Library/LibraryEntityDetails.vue';
import NewArtist from '@/views/Library/NewArtist.vue';
import NewAlbum from '@/views/Library/NewAlbum.vue';
import NewTrack from '@/views/Library/NewTrack.vue';
import Report from '../views/Report/Report.vue';
import ReportsListing from '../views/Report/ReportsListing.vue';
import Auth from '../views/Auth/Auth.vue';
import AuthUserVerification from '../views/Auth/AuthUserVerification.vue';
import AuthForgotPassword from '../views/Auth/AuthForgotPassword.vue';
import AuthChangePassword from '../views/Auth/AuthChangePassword.vue';
import Login from '../views/Auth/Login.vue';
import Guide from '../views/Guide.vue';
import Profile from '../views/Profile/Profile.vue';
import Notification from '../views/Notification/Notification.vue';
import NotificationListing from '../views/Notification/NotificationListing.vue';
import User from '@/views/User/User.vue';
import UserListing from '@/views/User/UserListing.vue';
import LoginAudit from '@/views/User/LoginAudit.vue';
import Showcase from '@/views/Showcase/Showcase.vue';
import ShowcaseListing from '@/views/Showcase/ShowcaseListing.vue';

const routes: Array<RouteRecordRaw> = [
  // Home Route
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Library Routes
  {
    path: '/library',
    name: 'Library',
    component: Library,
    children: [
      {
        path: 'listing',
        name: 'LibraryListing',
        component: LibraryListing,
      },
      {
        path: 'details',
        name: 'LibraryEntityDetails',
        component: LibraryEntityDetails,
      },
      {
        path: 'new/artist',
        name: 'NewArtist',
        component: NewArtist,
      },
      {
        path: 'new/album',
        name: 'NewAlbum',
        component: NewAlbum,
      },
      {
        path: 'new/track',
        name: 'NewTrack',
        component: NewTrack,
      },
      {
        path: 'genres/listing',
        name: 'GenreListing',
        component: LibraryGenreListing,
        beforeEnter: (to, from, next) => {
          if (AuthService.isAdmin()) {
            next();
          } else {
            next({ name: 'Home' });
          }
        },
      },
    ],
  },
  // User Routes
  {
    path: '/user',
    name: 'User',
    component: User,
    beforeEnter: (to, from, next) => {
      if (AuthService.isAdmin()) {
        next();
      } else {
        next({ name: 'Home' });
      }
    },
    children: [
      {
        path: 'listing',
        name: 'UserListing',
        component: UserListing,
      },
      {
        path: 'login/listing',
        name: 'LoginListing',
        component: LoginAudit,
      },
    ],
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    beforeEnter: (to, from, next) => {
      if (AuthService.isAdmin()) {
        next();
      } else {
        next({ name: 'Home' });
      }
    },
    children: [
      {
        path: '',
        name: 'NotificationListing',
        component: NotificationListing,
      },
    ],
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Report,
    children: [
      {
        path: 'listing',
        name: 'ReportsListing',
        component: ReportsListing,
      },
    ],
  },
  {
    path: '/showcase',
    name: 'Showcase',
    component: Showcase,
    children: [
      {
        path: '',
        name: 'ShowcaseListing',
        component: ShowcaseListing,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (AuthService.isAdmin()) {
        next();
      } else {
        next({ name: 'Home' });
      }
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'verification',
        name: 'Verification',
        component: AuthUserVerification,
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: AuthForgotPassword,
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: AuthChangePassword,
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Guide,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    !AuthService.isAuthenticated()
    && to.name !== 'Login'
    && to.name !== 'Verification'
    && to.name !== 'ForgotPassword'
  ) next({ name: 'Login' });
  else if (AuthService.isAuthenticated() && to.name === 'Login') next({ name: 'Home' });
  else next();
});

export default router;
