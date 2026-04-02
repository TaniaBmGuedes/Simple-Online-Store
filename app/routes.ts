import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("products/:id", "routes/product.tsx"),
    route("cart", "routes/cart.tsx"),
  ]),
] satisfies RouteConfig;