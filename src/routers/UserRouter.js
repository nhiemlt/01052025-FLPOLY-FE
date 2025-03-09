import { lazy } from "react";

const Home = lazy(() => import("../pages/user/home/Home.jsx"));
const ProductList = lazy(() => import("../pages/user/product/ProductList.jsx"));
const ProductDetail = lazy(() => import("../pages/user/detail/ProductDetail.jsx"));
const Cart = lazy(() => import("../pages/user/cart/Cart.jsx"));
const Checkout = lazy(() => import("../pages/user/pay/Checkout.jsx"));
const OrderHistory = lazy(() => import("../pages/user/order/OrderHistory.jsx"));
const ChangePassword = lazy(() => import("../pages/user/account/ChangePassword.jsx"));
const UserProfile = lazy(() => import("../pages/user/account/UserProfile.jsx"));

const userRoutes = [
  { path: "home", component: Home },
  { path: "products", component: ProductList },
  { path: "product/:productId", component: ProductDetail },
  { path: "cart", component: Cart },
  { path: "checkout", component: Checkout },
  { path: "order-history", component: OrderHistory },
  { path: "change-password", component: ChangePassword },
  { path: "profile", component: UserProfile },
];

export default userRoutes;