import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { supabase } from "../lib/supabaseClient";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default component$(() => {
  const posts = useSignal<Post[]>([]);

  useTask$(async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    posts.value = data as Post[];
  });

  return (
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {posts.value.map((post) => (
          <li key={post.id} class="mb-4">
            <h2 class="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
});
