import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { supabase } from "../../../../lib/supabaseClient";

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const title = useSignal("");
  const content = useSignal("");
  const message = useSignal("");

  useTask$(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("title, content")
      .eq("id", loc.params.id)
      .single();
    if (data) {
      title.value = data.title;
      content.value = data.content;
    } else if (error) {
      message.value = error.message;
    }
  });

  const updatePost = $(async () => {
    const { error } = await supabase
      .from("posts")
      .update({ title: title.value, content: content.value })
      .eq("id", loc.params.id);
    if (error) {
      message.value = error.message;
    } else {
      nav("/admin/");
    }
  });

  return (
    <div>
      <h1 class="text-2xl font-bold mb-4">Edit Post</h1>
      <input
        type="text"
        class="border p-2 w-full mb-2"
        value={title.value}
        onInput$={(e) => (title.value = (e.target as HTMLInputElement).value)}
      />
      <textarea
        class="border p-2 w-full mb-2"
        value={content.value}
        onInput$={(e) =>
          (content.value = (e.target as HTMLTextAreaElement).value)
        }
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded"
        onClick$={updatePost}
      >
        Update
      </button>
      {message.value && <p class="mt-2 text-red-600">{message.value}</p>}
    </div>
  );
});
