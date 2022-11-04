//Para obter todos os quizzes, faça uma requisição GET para a imageUrl
//const imageUrlListQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

let quizzList = []

//Para buscar um único quizz, faça uma requisição GET para a imageUrl
/*"https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + "ID_DO_QUIZZ";*/

//Para criar um quizz, envie uma requisição POST para a imageUrl
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes


//objeto quizz vazio:
//o quiz abaixo foi copiado do exemplo no notion

// {
// 	id: 1,
// 	title: "Título do quizz",
// 	image: "https://http.cat/411.jpg",
// 	questions: [
// 		{
// 			title: "Título da pergunta 1",
// 			color: "#123456",
// 			answers: [
// 				{
// 					text: "Texto da resposta 1",
// 					image: "https://http.cat/411.jpg",
// 					isCorrectAnswer: true
// 				},
// 				{
// 					text: "Texto da resposta 2",
// 					image: "https://http.cat/412.jpg",
// 					isCorrectAnswer: false
// 				}
// 			]
// 		},
// 		{
// 			title: "Título da pergunta 2",
// 			color: "#123456",
// 			answers: [
// 				{
// 					text: "Texto da resposta 1",
// 					image: "https://http.cat/411.jpg",
// 					isCorrectAnswer: true
// 				},
// 				{
// 					text: "Texto da resposta 2",
// 					image: "https://http.cat/412.jpg",
// 					isCorrectAnswer: false
// 				}
// 			]
// 		},
// 		{
// 			title: "Título da pergunta 3",
// 			color: "#123456",
// 			answers: [
// 				{
// 					text: "Texto da resposta 1",
// 					image: "https://http.cat/411.jpg",
// 					isCorrectAnswer: true
// 				},
// 				{
// 					text: "Texto da resposta 2",
// 					image: "https://http.cat/412.jpg",
// 					isCorrectAnswer: false
// 				}
// 			]
// 		}
// 	],
// 	levels: [
// 		{
// 			title: "Título do nível 1",
// 			image: "https://http.cat/411.jpg",
// 			text: "Descrição do nível 1",
// 			minValue: 0
// 		},
// 		{
// 			title: "Título do nível 2",
// 			image: "https://http.cat/412.jpg",
// 			text: "Descrição do nível 2",
// 			minValue: 50
// 		}
// 	]
// }

//funcões genéricas

//verifica se o numero passado é maior ou igual ao minimo permitido
//as entradas são 2 números e a saída é booleano
function aboveOrEqualMin(value, minimal){
    if (value >= minimal){
        return true;
    } else {
        return false;
    }
}

//verifica se o numero passado é menor ou igual ao máximo permitido
//as entradas são 2 números e a saída é booleano
function belowOrEqualMax(value, max){
    if (value >= max){
        return true;
    } else {
        return false;
    }
}

// função auxiliar para checar se quantidade de elementos é igual
// ou maior ao minímo
// quantity é uma string, min é um número, o retorno é booleano
function checkQuantity(quantity, min){
    const number = Number(quantity);
    return aboveOrEqualMin(quantity, number)
}

//checa se a imageUrl da imageUrlm funciona, peguei aqui:
//https://wbruno.com.br/ajax/verificar-um-arquivo-de-imageUrlm-existe-javascript/
//a entrada é uma string que contém a imageUrl da imageUrlm
function validateImgimageUrl(imageUrl) {
	let img = document.createElement('img');
	img.src = imageUrl;

	img.onload = function() {
		console.log("A imageUrlm " + imageUrl + " existe");
        return true
	}
	img.onerror = function() {
		console.log("A imageUrlm " + imageUrl + " NAO existe");
        return false;
	}
}

//funcções genéricas

//Criação do Quizz: Informações básicas do quizz

//checa o comprimento do titulo
//title é uma string, o retorno é booleano
function validateQuizzTitleLength(title){
    if (aboveOrEqualMin(title.length, 20) && belowOrEqualMax(title.length, 65)){
        return true;
    } else {
        return false;
    }
}

//para validar a imageUrl de uma imageUrlm chame esta função genérica que criei
//esta função está escrita na seção de funções genéricas
validateImgimageUrl("");

//checa quantidade de questões
function validateNumberOfQuestions(quantity){
    return checkQuantity(quantity, 3);
}

//checa quantidade de níveis
function validateNumberOfLevels(quantity){
    return checkQuantity(quantity, 2);
}

//checa se as informações são válidas
function validateBasicInfo(title, imageUrl, numberOfQuestions, numberOfLevels){
    
    let count = 0;//conta as validações
    if (validateQuizzTitleLength(title) === true){
        count++;
    }
    if (validateImgimageUrl(imageUrl) === true){
        count++;
    }
    if (validateNumberOfQuestions(numberOfQuestions) === true){
        count++;
    }
    if (validateNumberOfLevels(numberOfLevels)){
        count++;
    }

    //retorna true se todas as informações foram validadas
    if (count === 4){
        return true;
    } else {
        return false;
    }
}

function insertInfoIntoQuizz(title, imageUrl){
    quizz.title = title;
    quizz.image = imageUrl;
}

function goToSecondScreen(){
    let isOk = false;

    const title = document.getElementsById("title").value;
    const imageUrl  = document.getElementsById("imageUrl").value;
    const numberOfQuestions = document.getElementsById("numberOfQuestions").value;
    const numberOfLevels = document.getElementsById("numberOfLevels").value;

    isOk = validateBasicInfo(title, imageUrl, numberOfQuestions, numberOfLevels);

    if (isOk === true){
        const main_box_basic_informations = document.querySelector(".main-box-basic-informations");
        main_box_basic_informations.classList.add("hidden");
    } else {
        alert("Informações incorretas!");
    }
}

//Criação do Quizz: Informações básicas do quizz

//Criação do Quizz: Perguntas do quizz

//valida tamanho da questão
//entada é uma string e saída é um booleano
function validateQuestionLength(question){
    return aboveOrEqualMin(question.length, 20);
}

//checa se a resposta não está vazia
//entada é uma string e saída é um booleano
function answerNotEmpty(answer){
    return aboveOrEqualMin(answer.length, 0);
}

//para validar a imageUrl de uma imageUrlm chame esta função genérica que criei
//esta função está escrita na seção de funções genéricas
validateImgimageUrl("");

//checa se há uma resposta certa na lista de respostas
//a entrada é uma lista de respostas, a saída é booleano
function isThereARightAnswer_aux(answers){
    for(let i = 0; i < answers.length; i++){
        if (answers[i].isCorrectAnswer === true){
            return true;
        }
    } 
    return false
}

//checa se há uma resposta certa no objeto pergunta
//entrada é um objeto pergunta, saída é booleano
function isThereARightAnswer(question){
    if (isThereARightAnswer_aux(question.answers) === true){
        return true;
    } else {
        return false;
    }
}

//conta quantidade de respostas erradas na lista de resposta
//a entrada é uma lista de respostas, a saída é um inteiro
function howManyWrongAnswers(answers){
    let count = 0;
    for(let i = 0; i < answers.length; i++){
        if (answers[i].isCorrectAnswer === false){
            count++;
        }
    }
    return count;
}

//conta quantidade de respostas erradas na questão
//entrada é um objeto questão, saída é um booleano
//retorna falso se quantity for menor que 1
function checkWrongAnswersQuantity(question){
    let quantity = howManyWrongAnswers(question.answers);
    return (aboveOrEqualMin(quantity, 1));
}

//function validateQuizzQuestions(question, imageUrl)

//Criação do Quizz: Perguntas do quizz




//lista dos Quizzes


function showQuizz(quizz){
    const content = document.querySelector(".grid")
    content.innerHTML += `<div class= "quizz"> 
    <div class = "card">
        <img src=${quizz.image} alt =${quizz.title}/> 
        <span class = "quizzTitle" > ${quizz.title} </span> 
    </div> 
    </div>` 
}


 function getQuizes() {
    const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
    axios.get(url)
        .then((response) => {
            response.data.map((quizz) => showQuizz(quizz))
        })
        .catch(error => console.log("erro na requisição get: ", error))
}

getQuizes()