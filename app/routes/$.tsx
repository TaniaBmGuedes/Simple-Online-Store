import { json } from "@remix-run/node";

export function loader() {
  throw json(null, { status: 404 });
}

export default function CatchAll() {
  return null;
}