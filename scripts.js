//Para obter todos os quizzes, faça uma requisição GET para a imageUrl
//const imageUrlListQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

let quizzList = [], idUserPost = []

//Para buscar um único quizz, faça uma requisição GET para a imageUrl
/*"https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + "ID_DO_QUIZZ";*/

//Para criar um quizz, envie uma requisição POST para a imageUrl
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes


//objeto quizz vazio:
// HEAD

//formato do quiz que deve ser enviado ao servidor:

//refs/remotes/origin/master

//funcões genéricas

//verifica se o numero passado é maior ou igual ao minimo permitido
//as entradas são 2 números e a saída é booleano

function checkLocalStorage(){
    let arr = localStorage.getItem("idUserPost")
    if (arr === null){
        const content = document.querySelector(".creatQuizz")
        content.classList.remove("hidden")
    }

    else{
        const content = document.querySelector(".userQuizzContainer")
        content.classList.remove("hidden")
        arr = JSON.parse(arr)   
        idUserPost = [...arr] 
    }
}

checkLocalStorage()


function aboveOrEqualMin(value, minimal){
    if (value >= minimal){
        return true;
    } else {
        console.log("valor menor que minimo");
        return false;
    }
}

//verifica se o numero passado é menor ou igual ao máximo permitido
//as entradas são 2 números e a saída é booleano
function belowOrEqualMax(value, max){
    if (value <= max){
        return true;
    } else {
        console.log("valor maior que max");
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

function validateImageUrl(imageUrl) {
	let img = document.createElement('img');
	img.src = imageUrl;

	img.onload = function() {
		console.log("A imageUrl" + imageUrl + " existe");
	}
	img.onerror = function() {
		console.log("A imageUrl" + imageUrl + " NAO existe");
	}
    if (img.src === imageUrl){
        return true;
    } else {
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
        console.log("titulo entre 20 e 65");
        return false;
    }
}

//para validar a imageUrl de uma imageUrlm chame esta função genérica que criei
//esta função está escrita na seção de funções genéricas
//validateImageUrl("");

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
        console.log("title");
    }
    if (validateImageUrl(imageUrl) === true){
        count++;
        console.log("image");
    }
    if (validateNumberOfQuestions(numberOfQuestions) === true){
        count++;
        console.log("questions");
    }
    if (validateNumberOfLevels(numberOfLevels) === true){
        count++;
        console.log("levels");
    }
    console.log(count);
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

    const title = document.getElementById("title").value;
    const imageUrl  = document.getElementById("imageUrl").value;
    const numberOfQuestions = document.getElementById("numberOfQuestions").value;
    const numberOfLevels = document.getElementById("numberOfLevels").value;

    isOk = validateBasicInfo(title, imageUrl, numberOfQuestions, numberOfLevels);

    if (isOk === true){
        console.log("ok");
        const main_box_basic_informations = document.querySelector(".main-box-basic-informations");
        main_box_basic_informations.classList.add("hidden");

        const create_questions_box = document.querySelector(".create-questions-box");
        create_questions_box.classList.remove("hidden");
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
//validateImageUrl("");

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
    if (idUserPost.includes(quizz.id)){
        const content = document.querySelector(".grid")
        content.innerHTML += `<div class= "quizz" onclick = "showSecondScreen()"> 
        <div class = "card">
            <div class="front"></div>
            <img src=${quizz.image} alt =${quizz.title}/> 
            <span class = "quizzTitle" > ${quizz.title} </span> 
        </div> 
        </div>`
        return 
    }
    const content = document.querySelector(".grid")
    content.innerHTML += `<div class= "quizz" onclick = "showSecondScreen()"> 
    <div class = "card">
        <div class="front"></div>
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


function showSecondScreen(){
    const content = document.querySelector("main")
    const secondeScreen = document.querySelector(".create-questions-box")
    content.classList.add("hidden")
    secondeScreen.classList.remove("hidden")
}

function showthirdScreen(){
    const content = document.querySelector("main")
    const thirdScreen = document.querySelector(".create-levels-box")
    content.classList.add("hidden")
    thirdScreen.classList.remove("hidden")
}

