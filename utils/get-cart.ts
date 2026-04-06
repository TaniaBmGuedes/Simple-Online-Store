import { createCookieSessionStorage } from "@remix-run/node";
import type { CartItem } from "types/cart";


export const cartStorage = createCookieSessionStorage({
    cookie : {
        name : "cart",
        httpOnly : true,
        maxAge : 60 * 60 * 24 * 7, // 7 days
        path : "/",
        sameSite : "lax",
        secure : process.env.NODE_ENV === "production",
        secrets: [process.env.SESSION_SECRET!],
    },
});


export async function getCart(request: Request): Promise<CartItem[]> {
  const session = await cartStorage.getSession(request.headers.get("Cookie"));
  return session.get("cart") || [];
}