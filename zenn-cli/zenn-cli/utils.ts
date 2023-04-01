import prompts from "npm:prompts";
import emojiRegex from "npm:emoji-regex";
import punycode from "npm:punycode";

export async function input_slug(): Promise<string> {
	const slug = await prompts({
		type: "text",
		name: "slug",
		message: "記事のslugを入力してください。",
		validate: (value: string) => {
			const slug_re = new RegExp(/^[a-z0-9_-]{12,50}$/);

			if (slug_re.test(value)) {
				return true;
			} else {
				return "slugは半角英数字とハイフン、アンダーバーかつ12～50文字以内である必要があります。";
			}
		},
	});
	return slug.slug;
}

export async function input_title(): Promise<string> {
	const title = await prompts({
		type: "text",
		name: "title",
		message: "記事のタイトルを入力してください。",
	});

	return title.title;
}

export async function input_eyecatch(): Promise<string> {
	const emoji = await prompts({
		type: "text",
		name: "emoji",
		message: "アイキャッチを指定してください",
		validate: (value: string) => {
			const regex = emojiRegex();

			if (regex.test(value) && (punycode.ucs2.decode(value).length <= 1)) {
				return true;
			} else {
				return "アイキャッチは1文字の絵文字である必要があります。";
			}
		},
	});

	return emoji.emoji;
}

export async function input_type(): Promise<string> {
	const choice = [
		{
			title: "tech",
			description: "",
		},
		{
			title: "idea",
			description: "",
		},
	];

	const type = await prompts({
		type: "select",
		name: "type",
		message: "記事のタイプを選択してください。",
		choices: choice,
		initial: 1,
	});

	return choice[type.type].title;
}
