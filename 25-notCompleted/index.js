import moment from "moment";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import express from "express";
import chalk from "chalk";
const app = express();

import {
	findAllBoards,
	findMessage,
	createBoard,
	createMessage,
	getBoardsCount,
	getMessagesCount
} from "./src/boardsController.js";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("Secret"));
app.use(
	session({
		cookie: { maxAge: 1000000 },
		resave: true,
		saveUninitialized: true,
		secret: 'Secret'
	})
);
app.use(flash());

app.set("view engine", "pug");
app.locals.moment = moment;
const jsonParser = express.json();

app.get("/", (req, res) => {
	let error = req.flash("error");
	if(error.length == 0) error = false
	res.render("index.pug", {
		error: error,
	});
});

app.get("/boards", (req, res) => {
	const nickname = req.cookies.nickname;
	findAllBoards((data) => {
		if (data) {
			res.render("allBoards.pug", {
				boards: data,
				nickname: nickname,
			});
		} else {
			req.flash("error", "Ошибка сервера");
			res.redirect("/");
		}
	});
});

app.get("/board/:id", (req, res) => {
	const boardId = req.params.id;

	findMessage(boardId, function (messages) {
		if (messages) {
			res.render("board.pug", {
				messages: messages,
				boardId: boardId,
				nickname: req.cookies.nickname,
			});
		} else {
			req.flash("error", "Доска не существует");
			res.redirect("/");
		}
	});
});

app.post("/board", jsonParser, (req, res) => {
	const name = req.body.name;
	const author = req.cookies.nickname;
	createBoard(name, author, (status) => {
		if (status) {
			res.redirect("/boards");
		} else {
			req.flash("error", "Не удалось создать доску");
			res.redirect("/");
		}
	});
});

app.get("/stats", (req, res) => {
	getBoardsCount((boardsCount) => {
		getMessagesCount((messagesCount) => {
			res.render("stats.pug", {
				nickname: req.cookies.nickname,
				boardsCount: boardsCount.count,
				messagesCount: messagesCount.count
			});
		});
	});
});

app.post("/message", jsonParser, (req, res) => {
	const message = req.body.message;
	const author = req.cookies.nickname;
	const boardId = req.body.boardId;
	if (!message || !author || !boardId) {
		req.flash("error", "Неверно заполнена форма");
		res.redirect("/");
	}

	createMessage(author, message, boardId, (status) => {
		if (status) {
			res.redirect("/board/" + boardId);
		} else {
			req.flash("error", "Ошибка сервера");
			res.redirect("/");
		}
	});
});

app.get("/nickname", (req, res) => {
	res.render("nickname.pug", {
		nickname: req.cookies.nickname,
	});
});

app.post("/nickname", jsonParser, (req, res) => {
	const nickname = req.body.nickname;
	res.cookie("nickname", nickname);
	res.redirect("/nickname");
});

app.listen("3000", "127.0.0.1", () => {
	console.log(chalk.yellow("Server Has Started at 127.0.0.1:3000"));
});
