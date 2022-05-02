import process from "process";

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("imageboard", "root", "", {
	dialect: "mysql",
	host: "localhost",
	logging: false,
});

var firstStart = {}
if (process.argv[2] == 'init') {
	firstStart = {force: true}
}

const Board = sequelize.define("board", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

const Message = sequelize.define("message", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	message: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

Board.hasMany(Message);

sequelize
	.sync(firstStart)
	.then(() => {})
	.catch((err) => {
		return console.log(err);
	});

process.addListener("exit", function () {
	sequelize.close();
});

export function findAllBoards(callback) {
	Board.findAll({ raw: true })
		.then((data) => {
			// console.log(data);
			callback(data);
		})
		.catch((err) => {
			console.log(err);
			callback(false);
		});
}

export function findMessage(id, callback) {
	let boardId = parseInt(id);

	Message.findAll({
		where: {
			boardId: boardId,
		},
		raw: true,
	})
		.then((data) => {
			callback(data);
		})
		.catch((err) => {
			console.log(err);
			callback(false);
		});
}

export function createBoard(name, author, callback) {
	Board.create({
		name: name,
		author: author,
	}).catch((err) => {
		console.log(err);
		callback(false);
	});
	callback(false);
}

export function createMessage(author, message, boardId, callback) {
	Message.create({
		author: author,
		message: message,
		boardId: boardId,
	}).catch((err) => {
		console.log(err);
		callback(false)
	});
	callback(true);
}

export function getAllCount(params) {
	Board.findAndCountAll()
	.then((data) => {
		//----------------
		console.log(data);
		callback(data);
	})
	.catch((err) => {
		console.log(err);
		return false
	});
}

export function getBoardsCount(callback) {
	Board.findAndCountAll()
		.then((data) => {
			callback(data);
		})
		.catch((err) => {
			console.log(err);
			return false
		});
}

export function getMessagesCount(callback) {
	Message.findAndCountAll()
		.then((data) => {
			callback(data);
		})
		.catch((err) => {
			console.log(err);
			return false
		});
}

