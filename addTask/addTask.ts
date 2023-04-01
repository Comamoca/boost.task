import { join } from "https://deno.land/std@0.130.0/path/mod.ts";
import {
	globalTask,
	localTask,
} from "https://raw.githubusercontent.com/Comamoca/boost/main/task.ts";
import {
	hasSpace,
	isEmptyString,
} from "https://deno.land/x/boost_cli@0.0.1/utils.ts?source";

const error = (msg?: string) => {
	if (msg?.length <= 0) {
		msg = "🚨 An error has occurred💥";
	}

	console.log(msg);
	Deno.exit(0);
};

const taskname = prompt("Creat your Task file");

if (
	hasSpace(taskname) || isEmptyString(taskname) || (taskname == null)
) {
	error("Task name is must not have space and the following 0 length.");
} else {
	const isGlobal = confirm("Save to Global?");

	if (typeof taskname == "undefined") {
		error();
	}

	if (isGlobal) {
		Deno.copyFile(taskname, join(globalTask, taskname));
		console.log("Save to Global✨");
	} else {
		Deno.copyFile(taskname, join(localTask, taskname));
		console.log("Save to Local✨");
	}
}
