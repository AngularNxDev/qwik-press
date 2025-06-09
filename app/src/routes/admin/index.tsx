import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "@builder.io/qwik-city";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default component$(() => {
  const posts = useSignal<Post[]>([]);
  const message = useSignal("");

  useTask$(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      message.value = error.message;
    } else {
      posts.value = (data ?? []) as Post[];
    }
  });

  const deletePost = $(async (id: number) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      message.value = error.message;
    } else {
      posts.value = posts.value.filter((p) => p.id !== id);
    }
  });

  return (
    <div>
      <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
      {message.value && <p class="mb-4 text-red-600">{message.value}</p>}
      <table class="min-w-full bg-white shadow rounded">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="p-2 text-left">Title</th>
            <th class="p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.value.map((post) => (
            <tr key={post.id} class="border-b last:border-b-0">
              <td class="p-2">{post.title}</td>
              <td class="p-2 text-right space-x-2">
                <Link
                  href={`/admin/edit/${post.id}`}
                  class="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick$={() => deletePost(post.id)}
                  class="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
