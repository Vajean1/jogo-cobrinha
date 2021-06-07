let canvas = document.getElementById('snake'); // pegou o elemento canvas com id snake
let context = canvas.getContext("2d") // ele vai renderizar o desenho que vai acontecer no canvas, no caso 2d
let box = 32;  
let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box
}

let direction = "right";
let food = { // criar numeros aleatorios para a comida nascer no mapa
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}


function criarBG() { //funcao criar background
	context.fillStyle = "lightgreen" // a cor do back
	context.fillRect(0, 0, 16 * box, 16 * box); // via desenhar o retangulo onde vai acontecer o jogo e trabalha com qutro parametros, posição de x e y, altura e largura.
}

function criarCobrinha() { // criando a cobrinha
	for (var i = 0; i < snake.length; i++) {
		context.fillStyle = "green";
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function drawFood(){ //function do desenho da comida da cobrinha
	context.fillStyle = "red";
	context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); // ele vai pegar uma tecla clicada e iniciar a function upadete

function update(event){ //function update utilizada pelo addeventlistener
	if (event.keyCode == 37 && direction != "right") direction = 'left'
	if (event.keyCode == 38 && direction != "down") direction = 'up'
	if (event.keyCode == 39 && direction != "left") direction = 'right'
	if (event.keyCode == 40 && direction != "up") direction = 'down'
}

function iniciarJogo() { //function para iniciar o jogo
	if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
	if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
	if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
	if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

	for (i = 1; i < snake.length; i++) { // checar se a cobra vai entrar em contato com si mesma e finalizar o game
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			clearInterval(jogo); // Vai fechar a function jogo
			alert('GAME OVER! \nNÃO FOI DESSA VEZ OTÁRIO :L')
		}
	}	

	criarBG();
	criarCobrinha();
	drawFood();

	let snakeX = snake[0].x; // posição inicial da cobinha
	let snakeY = snake[0].y;

	if (direction == "right") snakeX += box; // para a cobrinha continuar seguindo
	if (direction == "left") snakeX -= box;
	if (direction == "up") snakeY -= box;
	if (direction == "down") snakeY += box;
	//movimento da cobrinha
	
	if (snakeX != food.x || snakeY != food.y){ //quando a cobra pegar a comida ele vai aparecer em um novo lugar e aumenta o tamanho
		snake.pop();
	}else{
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.y = Math.floor(Math.random() * 15 + 1) * box;
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	}

	snake.unshift(newHead);
}


let jogo = setInterval(iniciarJogo, 100); // intervalo de tempo para rodar o jogo e n travar

