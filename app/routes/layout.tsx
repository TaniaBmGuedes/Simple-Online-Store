import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      {/* TODO: Header with navigation and cart icon */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </>
  );
}