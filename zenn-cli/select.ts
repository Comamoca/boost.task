import nfzf from "https://esm.sh/node-fzf@0.11.0";

const cmd = "zenn";

const tasks = [
  "new:article",
  "preview",
];

export async function select(): Promise<string> {
  const opts = {
    list: tasks,
    mode: "fuzzy" || "normal",
    prefill: "",
    prelinehook: function (index: Record<string, string>) {
      return "";
    },
    postlinehook: function (index: Record<string, string>) {
      return "";
    },
  };

  const result = await nfzf(opts);
  const { selected, query } = result;

  if (!selected) {
    return `No matches for: ${query}`;
  } else {
    return selected.value;
  }
}
