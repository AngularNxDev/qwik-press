import { component$, useSignal, $ } from "@builder.io/qwik";
import { supabase } from "../../../lib/supabaseClient";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const title = useSignal("");
  const content = useSignal("");
  const message = useSignal("");
  const nav = useNavigate();

  const createPost = $(async () => {
    const { error } = await supabase
      .from("posts")
      .insert({ title: title.value, content: content.value });
    if (error) {
      message.value = error.message;
    } else {
      nav("/admin/");
    }
  });

  return (
    <div>
      <h1 class="text-2xl font-bold mb-4">New Post</h1>
      <input
        type="text"
        placeholder="Title"
        class="border p-2 w-full mb-2"
        value={title.value}
        onInput$={(e) => (title.value = (e.target as HTMLInputElement).value)}
      />
      <textarea
        placeholder="Content"
        class="border p-2 w-full mb-2"
        value={content.value}
        onInput$={(e) =>
          (content.value = (e.target as HTMLTextAreaElement).value)
        }
      />
      <button
        onClick$={createPost}
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create
      </button>
      {message.value && <p class="mt-2 text-red-600">{message.value}</p>}
    </div>
  );
});
