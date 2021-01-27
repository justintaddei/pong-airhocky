// Pong - 0.1 Alpha

var player = {
		x: 60,
		y: 0,
		width: 15,
		height: 40,
		velocity: {
			x: 0,
			y: 0
		},
		direction: {
			x: 0,
			y: 0
		}
	},
	opponent = {
		x: 930,
		y: 0,
		width: player.width,
		height: player.height,
		velocity: {
			x: 0,
			y: 0
		},
		direction: {
			x: 0,
			y: 0
		}
	},
	puck = {
		x: 0,
		y: 0,
		radius: 15,
		velocity: {
			x: 0,
			y: 0
		},
		friction: 0.01,
		direction: {
			x: 0,
			y: 0
		},
		possibleCollision: {
			top: false,
			bottom: false,
			left: false,
			right: false,
			opponent: {
				top: false,
				bottom: false,
				left: false,
				right: false
			}
		}
	},
	score = {
		player: 0,
		opponent: 0
	},
	gameon = true,
	canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');
var opponentMiddleY,
	opponentMiddleX,
	opponentLastY,
	opponentLastX;

function keepScore(scoreBy) {
	setTimeout(function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = '150px sans-serif';
		ctx.fillStyle = (scoreBy == 'player') ? '#0d0' : '#d00';
		ctx.textAlign = 'center';
		ctx.fillText(score.player + " - " + score.opponent, canvas.width / 2, canvas.height / 2);
		if (score.opponent < 6 && score.player < 6) {
			setTimeout(function () {
				puck.x = canvas.width / 2;
				puck.y = canvas.height / 2;
				puck.velocity.x = 0;
				puck.velocity.y = 0;
				puck.possibleCollision.opponent.top = false;
				puck.possibleCollision.opponent.bottom = false;
				puck.possibleCollision.opponent.left = false;
				puck.possibleCollision.opponent.right = false;
				puck.possibleCollision.top = false;
				puck.possibleCollision.bottom = false;
				puck.possibleCollision.left = false;
				puck.possibleCollision.right = false;
				gameon = true;
				gameHandler();
			}, 1000);
		} else {
			if (score.player === 6) {

			} else {

			}
		}
	}, 100);
}

var careful = false;

function ai() {
	opponentMiddleX = opponent.x + (opponent.width / 2);
	opponentMiddleY = opponent.y + (opponent.height / 2);

	if (!careful) {
		if (puck.y < opponentMiddleY) {
			if (!puck.possibleCollision.opponent.bottom || opponent.y > puck.radius * 2.1) {
				opponent.y -= opponent.velocity.y;
			} else {
				puck.velocity.x = 5;
				puck.direction.x = 0;
			}
		} else {
			if (!puck.possibleCollision.opponent.top || opponent.y + opponent.height < canvas.height - (puck.radius * 2.1)) {
				opponent.y += opponent.velocity.y;
			} else {
				opponent.y = (canvas.height - (puck.radius * 2.1)) - opponent.height;
				puck.velocity.x = 5;
				puck.direction.x = 0;
			}
		}
		if (puck.x < opponentMiddleX) {
			opponent.x -= opponent.velocity.x;
		}

		opponent.velocity.y = 1.8;
		opponent.velocity.x = 0;
	}
	if (puck.x > opponentMiddleX) {
		careful = true;
	}
	if (careful) {
		if (opponentMiddleY < canvas.height / 2) {
			if (opponent.y > puck.y + puck.radius + 4) {
				if (opponent.x > puck.x + (puck.radius * 2)) {
					opponent.y -= 5;
					opponent.direction.y = 0;
					if (opponentMiddleY < puck.y) {
						opponent.x -= 3;
						opponent.direction.x = 0;
					}
				} else {
					opponent.x += 3;
					opponent.direction.x = 1;
				}
			} else {
				opponent.y += 2;
				opponent.direction.y = 1;
			}
		} else {
			if (opponent.y + opponent.height < puck.y - puck.radius - 2) {
				if (opponent.x > puck.x + (puck.radius * 4)) {
					opponent.y += 5;
					opponent.direction.y = 1;
					if (opponentMiddleY > puck.y) {
						opponent.x -= 3;
						opponent.direction.x = 0;
					}
				} else {
					opponent.x += 3;
					opponent.direction.x = 0;
				}
			} else {
				opponent.y -= 2;
				opponent.direction.y = 0;
			}
		}
		setTimeout(function () {
			careful = false;
		}, 500);
	}

	if (puck.velocity.x < 4 && !careful) {
		if (puck.x > canvas.width / 2) {
			if (puck.x < opponentMiddleX) { //opponentMiddleY > puck.y - puck.radius && opponentMiddleY < puck.y + puck.radius &&
				opponent.velocity.x = 5;
			}
		}
	}


	if (opponent.y < opponentLastY) {
		opponent.direction.y = 0;
	} else {
		opponent.direction.y = 1;
	}
	if (opponent.x < opponentLastX) {
		opponent.direction.x = 0;
	} else {
		opponent.direction.x = 1;
	}
	opponentLastX = opponent.x;
	opponentLastY = opponent.y;
}

function drawTable() {
	ctx.fillStyle = '#fff';
	ctx.fillRect((canvas.width / 2) - 2.5, 0, 5, canvas.height);

	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
	ctx.fillStyle = '#000';
	ctx.fill();
	ctx.strokeStyle = '#fff';
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(0, canvas.height / 2, 50, 0, Math.PI * 2);
	ctx.strokeStyle = '#fff';
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(canvas.width, canvas.height / 2, 50, 0, Math.PI * 2);
	ctx.strokeStyle = '#fff';
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();
}

function checkForCollision() {
	var collisions = {
		wall: {
			top: false,
			bottom: false,
			left: false,
			right: false
		},
		paddle: {
			top: false,
			bottom: false,
			left: false,
			right: false,
			player: false
		}
	};
	// Walls
	if (puck.y - puck.radius <= 0) {
		collisions.wall.top = true;
	}

	if (puck.y + puck.radius >= canvas.height) {
		collisions.wall.bottom = true;
	}

	if (puck.x - puck.radius <= 0) {
		collisions.wall.left = true;
	}

	if (puck.x + puck.radius >= canvas.width) {
		collisions.wall.right = true;
	}

	// Player's paddle

	// Up
	if (puck.possibleCollision.top) {
		if (puck.y - puck.radius <= player.y + player.height) {
			collisions.paddle.top = true;
			collisions.paddle.player = true;
		}
	}
	if (puck.y - puck.radius > player.y + player.height) {
		if (puck.x + puck.radius > player.x) {
			if (puck.x - puck.radius < player.x + player.width) {
				if (!puck.possibleCollision.bottom) {
					puck.possibleCollision.top = true;
				}
			} else {
				puck.possibleCollision.top = false;
			}
		} else {
			puck.possibleCollision.top = false;
		}
	}

	// Down
	if (puck.possibleCollision.bottom) {
		if (puck.y + puck.radius >= player.y) {
			collisions.paddle.bottom = true;
			collisions.paddle.player = true;
		}
	}
	if (puck.y + puck.radius < player.y) {
		if (puck.x + puck.radius > player.x) {
			if (puck.x - puck.radius < player.x + player.width) {
				if (!puck.possibleCollision.top) {
					puck.possibleCollision.bottom = true;
				}
			} else {
				puck.possibleCollision.bottom = false;
			}
		} else {
			puck.possibleCollision.bottom = false;
		}
	}

	// Left
	if (puck.possibleCollision.left) {
		if (puck.x - puck.radius <= player.x + player.width) {
			collisions.paddle.left = true;
			collisions.paddle.player = true;
		}
	}
	if (puck.x - puck.radius > player.x + player.width) {
		if (puck.y + puck.radius > player.y) {
			if (puck.y - puck.radius < player.y + player.height) {
				if (!puck.possibleCollision.right) {
					puck.possibleCollision.left = true;
				}
			} else {
				puck.possibleCollision.left = false;
			}
		} else {
			puck.possibleCollision.left = false;
		}
	}

	// Right
	if (puck.possibleCollision.right) {
		if (puck.x + puck.radius >= player.x) {
			collisions.paddle.right = true;
			collisions.paddle.player = true;
		}
	}
	if (puck.x + puck.radius < player.x) {
		if (puck.y + puck.radius > player.y) {
			if (puck.y - puck.radius < player.y + player.height) {
				if (!puck.possibleCollision.left) {
					puck.possibleCollision.right = true;
				}
			} else {
				puck.possibleCollision.right = false;
			}
		} else {
			puck.possibleCollision.right = false;
		}
	}

	// Opponent's paddle

	// Up
	if (puck.possibleCollision.opponent.top) {
		if (puck.y - puck.radius <= opponent.y + opponent.height) {
			collisions.paddle.top = true;
		}
	}
	if (puck.y - puck.radius > opponent.y + opponent.height) {
		if (puck.x + puck.radius > opponent.x) {
			if (puck.x - puck.radius < opponent.x + opponent.width) {
				if (!puck.possibleCollision.opponent.bottom) {
					puck.possibleCollision.opponent.top = true;
				}
			} else {
				puck.possibleCollision.opponent.top = false;
			}
		} else {
			puck.possibleCollision.opponent.top = false;
		}
	}

	// Down
	if (puck.possibleCollision.opponent.bottom) {
		if (puck.y + puck.radius >= opponent.y) {
			collisions.paddle.bottom = true;
		}
	}
	if (puck.y + puck.radius < opponent.y) {
		if (puck.x + puck.radius > opponent.x) {
			if (puck.x - puck.radius < opponent.x + opponent.width) {
				if (!puck.possibleCollision.opponent.top) {
					puck.possibleCollision.opponent.bottom = true;
				}
			} else {
				puck.possibleCollision.opponent.bottom = false;
			}
		} else {
			puck.possibleCollision.opponent.bottom = false;
		}
	}

	// Left
	if (puck.possibleCollision.opponent.left) {
		if (puck.x - puck.radius <= opponent.x + opponent.width) {
			collisions.paddle.left = true;
		}
	}
	if (puck.x - puck.radius > opponent.x + opponent.width) {
		if (puck.y + puck.radius > opponent.y) {
			if (puck.y - puck.radius < opponent.y + opponent.height) {
				if (!puck.possibleCollision.opponent.right) {
					puck.possibleCollision.opponent.left = true;
				}
			} else {
				puck.possibleCollision.opponent.left = false;
			}
		} else {
			puck.possibleCollision.opponent.left = false;
		}
	}

	// Right
	if (puck.possibleCollision.opponent.right) {
		if (puck.x + puck.radius >= opponent.x) {
			collisions.paddle.right = true;
		}
	}
	if (puck.x + puck.radius < opponent.x) {
		if (puck.y + puck.radius > opponent.y) {
			if (puck.y - puck.radius < opponent.y + opponent.height) {
				if (!puck.possibleCollision.opponent.left) {
					puck.possibleCollision.opponent.right = true;
				}
			} else {
				puck.possibleCollision.opponent.right = false;
			}
		} else {
			puck.possibleCollision.opponent.right = false;
		}
	}


	if (puck.direction.x === 0 && puck.y - puck.radius > (canvas.height / 2) - 50 && puck.y + puck.radius < (canvas.height / 2) + 50) {
		collisions.wall.left = false;
	} else if (puck.direction.x === 1 && puck.y - puck.radius > (canvas.height / 2) - 50 && puck.y + puck.radius < (canvas.height / 2) + 50) {
		collisions.wall.right = false;
	}
	return collisions;
}

function calcPuckCoords() {
	var collision = checkForCollision();
	// Wall
	if (puck.direction.y === 0) {
		if (collision.wall.top) {
			puck.direction.y = 1;
		} else {
			if (puck.velocity.y > 0.02) {
				puck.velocity.y -= puck.friction;
			}
			puck.y -= puck.velocity.y;
		}
	}
	if (puck.direction.y === 1) {
		if (collision.wall.bottom) {
			puck.direction.y = 0;
		} else {
			if (puck.velocity.y > 0.02) {
				puck.velocity.y -= puck.friction;
			}
			puck.y += puck.velocity.y;
		}
	}
	if (puck.direction.x === 0) {
		if (collision.wall.left) {
			puck.direction.x = 1;
		} else {
			if (puck.velocity.x > 0.02) {
				puck.velocity.x -= puck.friction;
			}
			puck.x -= puck.velocity.x;
		}
	}
	if (puck.direction.x === 1) {
		if (collision.wall.right) {
			puck.direction.x = 0;
		} else {
			if (puck.velocity.x > 0.02) {
				puck.velocity.x -= puck.friction;
			}
			puck.x += puck.velocity.x;
		}
	}


	if (collision.paddle.player) { // Player
		if (collision.paddle.top) {
			if (player.direction.y === 1) {
				puck.velocity.y = Math.min(puck.velocity.y + player.velocity.y, 10);
				puck.velocity.x = (Math.min(puck.velocity.x + player.velocity.x, 5) / 2);
				puck.direction.x = player.direction.x;
			}
			puck.direction.y = 1;
		}
		if (collision.paddle.bottom) {
			if (player.direction.y === 0) {
				puck.velocity.y = Math.min(puck.velocity.y + player.velocity.y, 10);
				puck.velocity.x = (Math.min(puck.velocity.x + player.velocity.x, 5) / 2);
				puck.direction.x = player.direction.x;
			}
			puck.direction.y = 0;
		}

		if (collision.paddle.left) {
			if (player.direction.x === 1) {
				puck.velocity.x = Math.min(puck.velocity.x + player.velocity.x, 10);
				puck.velocity.y = (Math.min(puck.velocity.y + player.velocity.y, 5) / 2);
				puck.direction.y = player.direction.y;
			}
			puck.direction.x = 1;
		}
		if (collision.paddle.right) {
			if (player.direction.x === 0) {
				puck.velocity.x = Math.min(puck.velocity.x + player.velocity.x, 10);
				puck.velocity.y = (Math.min(puck.velocity.y + player.velocity.y, 5) / 2);
				puck.direction.y = player.direction.y;

			}
			puck.direction.x = 0;
		}
	} else { // Opponent
		if (collision.paddle.top) {
			if (opponent.direction.y === 1) {
				puck.velocity.y = Math.min(puck.velocity.y + opponent.velocity.y, 10);
				puck.velocity.x = (Math.min(puck.velocity.x + opponent.velocity.x, 5) / 2);
				puck.direction.x = opponent.direction.x;
			}
			puck.direction.y = 1;
		}
		if (collision.paddle.bottom) {
			if (opponent.direction.y === 0) {
				puck.velocity.y = Math.min(puck.velocity.y + opponent.velocity.y, 10);
				puck.velocity.x = (Math.min(puck.velocity.x + opponent.velocity.x, 5) / 2);
				puck.direction.x = opponent.direction.x;
			}
			puck.direction.y = 0;
		}

		if (collision.paddle.left) {
			if (opponent.direction.x === 1) {
				puck.velocity.x = Math.min(puck.velocity.x + opponent.velocity.x, 10);
				puck.velocity.y = (Math.min(puck.velocity.y + opponent.velocity.y, 5) / 2);
				puck.direction.y = opponent.direction.y;
			}
			puck.direction.x = 1;
		}
		if (collision.paddle.right) {
			if (opponent.direction.x === 0) {
				puck.velocity.x = Math.min(puck.velocity.x + opponent.velocity.x, 10);
				puck.velocity.y = (Math.min(puck.velocity.y + opponent.velocity.y, 5) / 2);
				puck.direction.y = opponent.direction.y;

			}
			puck.direction.x = 0;
		}
	}

	if (puck.x + puck.radius < 0) {
		gameon = false;
		score.opponent++;
		keepScore('opponent');
	}
	if (puck.x - puck.radius > canvas.width) {
		gameon = false;
		score.player++;
		keepScore('player');
	}
}

function drawPuck() {
	ctx.beginPath();
	ctx.arc(puck.x, puck.y, puck.radius * 0.8, 0, Math.PI * 2);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(puck.x, puck.y, puck.radius * 0.9, 0, Math.PI * 2);
	ctx.strokeStyle = '#aaa';
	ctx.lineWidth = puck.radius * 0.2;
	ctx.stroke();
	ctx.closePath();
}

function drawOpponent() {
	ctx.fillStyle = '#fff';
	ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
}


function calcPlayerCoords(event) {
	var x = player.x,
		y = player.y;

	// X
	if (event.clientX - canvas.offsetLeft > canvas.width / 2) {
		x = canvas.width / 2 - player.width;
	} else if (event.clientX - canvas.offsetLeft < 0) {
		x = 0;
	} else {
		x = (event.clientX - canvas.offsetLeft) - (player.width / 2);
	}

	// Y
	if (event.clientY - canvas.offsetTop > canvas.height) {
		y = canvas.height - player.height;
	} else if (event.clientY - canvas.offsetTop < 0) {
		y = 0;
	} else {
		y = (event.clientY - canvas.offsetTop) - (player.height / 2);
	}

	if (puck.possibleCollision.bottom && event.clientY - canvas.offsetTop < puck.radius * 2.1) {
		y = puck.radius * 2;
		puck.velocity.x = 5;
		puck.direction.x = 1;
	}
	if (puck.possibleCollision.top && event.clientY - canvas.offsetTop > (canvas.height - (puck.radius * 2.1)) - player.height) {
		y = (canvas.height - (puck.radius * 2)) - player.height;
		puck.velocity.x = 5;
		puck.direction.x = 1;
	}

	player.x = x;
	player.y = y;
}

function drawPlayer() {
	ctx.fillStyle = '#fff';
	ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameHandler() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	calcPuckCoords();
	drawTable();
	drawPlayer();
	drawOpponent();
	drawPuck();
	ai();
	if (gameon) {
		setTimeout(gameHandler, 1);
	}
}

var lastx = 0,
	lasty = 0;

function mouseHandler(event) {
	if (event) {
		calcPlayerCoords(event);
	}
	if (player.x > lastx) {
		player.direction.x = 1;
	} else {
		player.direction.x = 0;
	}
	if (player.y > lasty) {
		player.direction.y = 1;
	} else {
		player.direction.y = 0;
	}
	player.velocity.x = Math.min(Math.abs(player.x - lastx), 5);
	player.velocity.y = Math.min(Math.abs(player.y - lasty), 5);
	if (player.x === lastx) {
		player.velocity.x = 0;
	}
	if (player.y === lasty) {
		player.velocity.y = 0;
	}
	lastx = player.x;
	lasty = player.y;
	if (event) {
		setTimeout(mouseHandler, 1);
	}
}

function init() {
	player.y = (canvas.height / 2) - (player.height / 2);
	opponent.y = (canvas.height / 2) - (player.height / 2);
	puck.x = (canvas.width / 2);
	puck.y = (canvas.height / 2);
	document.addEventListener('mousemove', function (event) {
		mouseHandler(event);
	});
	gameHandler();
}

init();
