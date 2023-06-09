import { $ } from "https://deno.land/x/dax@0.27.0/mod.ts";

import {
  input_eyecatch,
  input_slug,
  input_title,
  input_type,
} from "./zenn-cli/utils.ts";
import { select } from "./zenn-cli/select.ts";

const task = await select();

if (task === "new:article") {
  const type = await input_type();
  const title = await input_title();
  const slug = await input_slug();
  const eyecatch = await input_eyecatch();

  console.log(
    `npx zenn ${task} --slug ${slug} --title ${title} --type ${type} --emoji ${eyecatch}`,
  );
  await $`npx zenn ${task} --slug ${slug} --title ${title} --type ${type} --emoji ${eyecatch}`;
} else if (task === "preview") {
  // await $`npx zenn ${task}`;
  console.log(`npx zenn ${task}`);
} else {
  console.log("コマンドが見つかりません。");
}
// await $`npx zenn ${task}`;
