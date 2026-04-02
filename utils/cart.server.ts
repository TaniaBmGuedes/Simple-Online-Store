
import type { CartItem } from "types/cart";
import { cartStorage } from "./get-cart";


export async function addToCart(
  request: Request,
  item: Omit<CartItem, "quantity">,
) {
  const session = await cartStorage.getSession(request.headers.get("Cookie"));
  const cart: CartItem[] = session.get("cart") || [];

  const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  session.set("cart", cart);
  return await cartStorage.commitSession(session);
}

export async function updateCartItem(request: Request, id:number, quantity: number) {
  const session = await cartStorage.getSession(request.headers.get("Cookie"));
  const cart: CartItem[] = session.get("cart") || [];

  const itemToUpdate = cart.find((cartItem) => cartItem.id === id);
  if (itemToUpdate) {
    itemToUpdate.quantity = quantity;
  }
  session.set("cart", cart.filter((item) => item.quantity > 0));
  return await cartStorage.commitSession(session);
}
export async function removeFromCart(request: Request, id: number) {
  const session = await cartStorage.getSession(request.headers.get("Cookie"));
  const cart: CartItem[] = session.get("cart") || [];

  session.set("cart", cart.filter((i) => i.id !== id));
  return cartStorage.commitSession(session);
}
export {type CartItem};