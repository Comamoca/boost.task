import Spinner from "https://raw.githubusercontent.com/shinshin86/deno_spin/main/mod.ts";
import { ai_slug_emoji } from "./chatgpt.ts";
import ora from "npm:ora";
import {
  SpinnerTypes,
  TerminalSpinner,
} from "https://deno.land/x/spinners/mod.ts";
import { sleep } from "https://x.nest.land/sleep@1.0.0/mod.ts";

const msg = "AIでタイトルに適したslugを生成しています...";

const terminalSpinner = new TerminalSpinner({
  text: msg,
  color: "green",
  spinner: SpinnerTypes.arc,
  indent: 0,
  cursor: false,
  writer: Deno.stdout,
});

terminalSpinner.start();

// const slug = ai_slug_emoji("Elixirで堅牢なBotインフラを構築する");

await sleep(3);
terminalSpinner.succeed("完了しました");
// console.log(slug);
