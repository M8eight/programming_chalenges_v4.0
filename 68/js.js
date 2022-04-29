const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let depth = 10;

one = {
	x: 0,
	y: 500,
};

two = {
	x: 250,
	y: 0,
};

three = {
	x: 500,
	y: 500,
};

function drawTriangle(oneVar, twoVar, threeVar) {
	ctx.beginPath();
	ctx.moveTo(oneVar.x, oneVar.y);
	ctx.lineTo(twoVar.x, twoVar.y);
	ctx.lineTo(threeVar.x, threeVar.y);
	ctx.lineTo(oneVar.x, oneVar.y);
	ctx.stroke();
}

function superDraw(oneVar, twoVar, threeVar, depth) {
	if (depth > 0) {
		let oneOne = {
			x: (oneVar.x + twoVar.x) / 2,
			y: (oneVar.y + twoVar.y) / 2,
		};

		let twoTwo = {
			x: (twoVar.x + threeVar.x) / 2,
			y: (twoVar.y + threeVar.y) / 2,
		};

		let threeThree = {
			x: (threeVar.x + oneVar.x) / 2,
			y: (threeVar.y + threeVar.y) / 2,
		};

		superDraw(oneVar, oneOne, threeThree, depth - 1);
		superDraw(oneOne, twoVar, twoTwo, depth - 1);
		superDraw(threeThree, twoTwo, threeVar, depth - 1);

		drawTriangle(threeVar, twoVar, threeVar, depth - 1);
	} else {
		drawTriangle(oneVar, twoVar, threeVar);
	}
}

superDraw(one, two, three, depth);
