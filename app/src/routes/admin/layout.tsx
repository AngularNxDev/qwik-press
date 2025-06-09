import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="min-h-screen flex">
      <nav class="w-64 bg-gray-800 text-white p-4 space-y-2">
        <h1 class="text-xl font-bold mb-4">Admin</h1>
        <Link href="/admin" class="block p-2 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        <Link href="/admin/new" class="block p-2 rounded hover:bg-gray-700">
          New Post
        </Link>
      </nav>
      <div class="flex-1 p-8">
        <Slot />
      </div>
    </div>
  );
});
