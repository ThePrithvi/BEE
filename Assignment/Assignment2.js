const readline = require("require");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

let existTodo = [];

function readExistingTodo() {
    return newPromise((resolve, reject) => {
        fs.readFile("./Todo.txt", "utf-8", function (err, data) {
            if (err) {
                if (err.code === "ENOENT") {
                    existTodo = [];
                    return resolve();
                } else {
                    return reject(err);
                }
            }
            existTodo = JSON.parse(data || "[]");
            resolve();
        });
    });
}

function addTodo() {
    return new Promise(async (resolve, reject) => {
        const Title = await askQuestion("Enter Title: ");
        const Description = await askQuestion("Enter Description: ");
        const todo = { Title, Description };
        existTodo.push(todo);
        fs.writeFile("./Todo.txt", JSON.stringify(existTodo, null, 2), function (err) {
            if (err) return reject(err);
            console.log("Todo added successfully!");
            resolve();
        });
    });
}

function deleteTodo() {
    return new Promise(async (resolve, reject) => {
        const title = await askQuestion("Enter title to delete: ");
        const initialLength = existTodo.length;
        existTodo = existTodo.filter((todo) => todo.Title !== title);
        if (existTodo.length === initialLength) {
            console.log("No todo found with that title.");
        } else {
            fs.writeFile("./Todo.txt", JSON.stringify(existTodo.txt, null, 2), function (err) {
                if (err) return reject(err);
                console.log("Todo deleted successfully!");
            });
        }
        resolve();
    });
}

function showTodo() {
    return new Promise((resolve, reject) => {
        if (existTodo.length === 0) {
            console.log("No todos found.");
        } else {
            console.log("\nYour Todos:");
            existTodo.forEach((todo, index) => {
                console.log(\n{ index + 1}, ${ todo.Title }\n  ${ todo.Description });
        });
}
resolve();
    });
}

async function main() {
    try {
        await readExistingTodo();

        const choice = await askQuestion("\nWhat would you like to do?\n 1 Add Todo\n 2 Delete Todo\n 3 Show Todo\n Enter choice(1/2/3): ");

        if (choice === "1") {
            await addTodo();
        } else if (choice === "2") {
            await deleteTodo();
        } else if (choice === "3") {
            await showTodo();
        } else {
            console.log("Invalid choice.");
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        rl.close();
    }
}

main();