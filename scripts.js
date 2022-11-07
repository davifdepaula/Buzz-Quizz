//Para obter todos os quizzes, faça uma requisição GET para a imageUrl
//const imageUrlListQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

let quizzList = [], idUserPost = [],  percent = 0
let isOver = 0

//Para buscar um único quizz, faça uma requisição GET para a imageUrl
/*"https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + "ID_DO_QUIZZ";*/

//Para criar um quizz, envie uma requisição POST para a imageUrl
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes

let title;
let imageUrl;
let numberOfQuestions;
let numberOfLevels;

let answer_texts = [];
let image_texts = [];


let quizz = {
    id: 1,
 	title: "",
 	image: "",
 	questions: []};

let question = {
    title: "",
 	color: "",
 	answers: 
        [
 		    
        ]
    };



//início funcões genéricas

function resetQuizz(){
    quizz.title = "";
 	quizz.image = "";
 	quizz.questions = [];
}

function resetQuestion(){
    question.title = "";
    question.color = "";
    question.answers = [];
}

function resetGlobalVariables(){
    title = "";
    imageUrl = "";
    numberOfQuestions = 0;
    numberOfLevels = 0;
    answer_texts = [];
    image_texts = [];
    isCorrectAnswer = [true, false, false, false];
    answer = {
        text : "",
        image : "",
        isCorrectAnswer: undefined
    }
    resetQuestion();
}

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
        return false;
    }
}

//verifica se o numero passado é menor ou igual ao máximo permitido
//as entradas são 2 números e a saída é booleano
function belowOrEqualMax(value, max){
    if (value <= max){
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

function validateImageUrl(imageUrl) {
	let img = document.createElement('img');
	img.src = imageUrl;

	img.onload = function() {
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

function validateMultImageUrl(imageUrls){
    for (let i = 0; i < imageUrls.length; i++){
        if (validateImageUrl(imageUrls[i].value) === false){
            return false;
        } else {
            image_texts.push(imageUrls[i].value);
        };
    };
    return true;
}

function hideScreens(){
    const createQuestionsBox = document.querySelector(".main-box-basic-informations");
    createQuestionsBox.classList.add("hidden");

    let secondScreen = document.querySelector(".create-questions-box");
    secondScreen.classList.add("hidden");  
    
    let thirdScreen = document.querySelector(".create-levels-box");
    thirdScreen.classList.add("hidden");

    let fourthScreen = document.querySelector(".Finished-quizz-box");
    fourthScreen.classList.add("hidden");
}

//fim funcções genéricas

//inicio Criação do Quizz: Informações básicas do quizz



function createFirstScreen(){
    const main = document.querySelector("main");
    main.classList.add("hidden");


    const createQuestionsBox = document.querySelector(".main-box-basic-informations");
    createQuestionsBox.classList.remove("hidden");
}

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
    if (validateImageUrl(imageUrl) === true){
        count++;
    }
    if (validateNumberOfQuestions(numberOfQuestions) === true){
        count++;
    }
    if (validateNumberOfLevels(numberOfLevels) === true){
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

    title = document.getElementById("title").value;
    imageUrl  = document.getElementById("imageUrl").value;
    numberOfQuestions = document.getElementById("numberOfQuestions").value;
    numberOfLevels = document.getElementById("numberOfLevels").value;

    isOk = validateBasicInfo(title, imageUrl, numberOfQuestions, numberOfLevels);

    if (isOk === true){
        insertInfoIntoQuizz(title, imageUrl);
        createSecondScreen();
    } else {
        alert("Informações incorretas!");
    }
}

//fim Criação do Quizz: Informações básicas do quizz

//inicio Criação do Quizz: Perguntas do quizz

function createQuestions_box(){
    let questions_box = '';
    let numeroDaPergunta; 
    for (let i = 0; i<numberOfQuestions; i++){
        numeroDaPergunta = i + 1;
        questions_box += 
        `
            <div class="questions-box">
                <h3 class = "collapse">Pergunta ${numeroDaPergunta}</h3>
                <div class="content content-question">
                    <input placeholder="Texto da pergunta" type="text" class="question-text">
                    <input placeholder="Cor de fundo da pergunta"type="text" class="question-color">
                    <h4>Resposta correta</h4>
                    <input placeholder="Resposta correta " type="text" class="answer-txt">
                    <input placeholder="URL da imagem"type="text" class="img-url">
                    <h4>Respostas incorretas</h4>
                    <input placeholder="Resposta incorreta 1" type="text" class="answer-txt">
                    <input placeholder="URL da imagem 1"type="text" class="img-url">
                    <div class="space"></div>
                    <input placeholder="Resposta incorreta 2" type="text" class="answer-txt">
                    <input placeholder="URL da imagem 2"type="text" class="img-url">
                    <div class="space"></div>
                    <input placeholder="Resposta incorreta 3" type="text" class="answer-txt">
                    <input placeholder="URL da imagem 3"type="text" class="img-url">
                </div>
            </div>
        `;
    }
    return questions_box;
}



function createSecondScreen(){
    let firstScreen = document.querySelector(".main-box-basic-informations");
    firstScreen.classList.add("hidden");

    let secondScreen = document.querySelector(".create-questions-box");
    secondScreen.classList.remove("hidden");
    secondScreen.innerHTML = 
    `
    <h2>Crie suas perguntas</h2>
    ${createQuestions_box()}
    <div onclick="goToThirdScreen()" class="button"><p>Prosseguir pra criar níveis</p></div>
    `;
    CollapseBox();
}

//valida tamanho da questão
//entrada é uma string e saída é um booleano
function validateQuestionLength(question){
    return aboveOrEqualMin(question.length, 20);
}


function validateBackgroundColor(str){
    if (str[0] === "#" && CSS.supports('color', str)){
        return true;
    } else {
        return false;
    }
}

function validateAllBackgroundColor(colors){
    for (let i = 0; i < colors.length; i++){
        if (validateBackgroundColor(colors[i]) === false){
            return false;
        }
    }
    return true;
}

//checa se a resposta não está vazia
//entada é uma string e saída é um booleano
function answerNotEmpty(answer){
    return aboveOrEqualMin(answer.length, 0);
}

function AllAnswersNotEmpty(answers){
    
    for(let i = 0; i<answers.length; i++){
        if (answerNotEmpty(answers[i].value) === false){
            return false;
        } else {
            answer_texts.push(answers[i].value);
        };
    };
    return true;
}



//checa se há uma resposta certa na lista de respostas
//a entrada é uma lista de respostas, a saída é booleano
function isThereARightAnswer_aux(answers){
    for(let i = 0; i < answers.length; i++){
        if (answers[i].isCorrectAnswer === true){
            return true;
        }
    } 
    return false;
}

//conta quantidade de respostas erradas na questão
//entrada é um objeto questão, saída é um booleano
//retorna falso se quantity for menor que 1
function checkWrongAnswersQuantity(question){
    let quantity = howManyWrongAnswers(question.answers);
    return (aboveOrEqualMin(quantity, 1));
}

/*
function answersToQuestion(){
    for (let i = 0; i<answer_texts.length; i++){
        answer.text = answer_texts[i];
        answer.image = image_texts[i];
        answer.isCorrectAnswer = isCorrectAnswer[i];
        question.answers.push(answer);
    }
}
*/

function answersToQuestion_aux(text, img, isCorrect){
    let answer = {
        text : text,
        image : img,
        isCorrectAnswer: isCorrect
    }
    return answer;
}

function answersToQuestion(answerLst, imageLst){
    console.log(`comprimento array respostas a ser inserido na questão: ${answerLst.length}`);
    console.log(`comprimento array imagens a ser inserido na questão ${imageLst.length}`);
    let isCorrectAnswer = [true, false, false, false];
    /*
    let answer = {
        text : "",
        image : "",
        isCorrectAnswer: undefined
    }*/
    let lista_repostas = []
    for (let i = 0; i<answerLst.length; i++){
/*        answer.text = answerLst[i].value;
        answer.image = imageLst[i].value;
        answer.isCorrectAnswer = isCorrectAnswer[i];*/
        lista_repostas.push(answersToQuestion_aux(answerLst[i].value, imageLst[i].value, isCorrectAnswer[i]));   
    }
    console.log(`lista de respostas a ser inserida na questão ${lista_repostas}`);
    question.answers = lista_repostas;
    console.log(`lista de respostas da questão ${question.answers}`);
    questionToQuizz();
}

function questionToQuizz(){
    quizz.questions.push(question);
}

function validateContent(content){
    let content_question = content.querySelector(".question-text").value;
    if (validateQuestionLength(content_question) === false){
        return false;
    } else {
        question.title = content_question;
    };
    
    let content_color = content.querySelector(".question-color").value;
    if (validateBackgroundColor(content_color) === false){
        return false;
    } else {
        question.color = content_color;
    };

    let answers_text = content.querySelectorAll(".answer-txt");
    if (AllAnswersNotEmpty(answers_text) === false){
        return false;
    };

    let img_url = content.querySelectorAll(".img-url");
    if (validateMultImageUrl(img_url) === false){
        return false;
    };

    console.log(`comprimento array respostas a ser inserido na questão ${answers_text.length}`);
    answersToQuestion(answers_text, img_url);
    

    return true;
}

function validateContents(contents){
    for (let i = 0; i<contents.length; i++){
        if (validateContent(contents[i]) === false){
            return false;
        }
    }
    return true;
}

function validateQuizzQuestions(){
    let isOk = false;
    let contents = document.querySelectorAll(".content-question");
    console.log(`content-question ${contents.length}`);
    isOk = validateContents(contents);
    if (isOk){
        console.log("info das questoes validada!");
    } 
    return isOk; 
}

function goToThirdScreen(){
    let isOk = validateQuizzQuestions();
    console.log(quizz);
    if (isOk === true){
        let secondScreen = document.querySelector(".create-questions-box");
        secondScreen.classList.add("hidden");

        createLevelsQuizzScreen();

        
    } else {
        alert("Algo está errado!");
    }
}

//fim Criação do Quizz: Perguntas do quizz

//inicio Criação do Quizz: Níveis do quizz

function createLevelsBox(){
    let levelBox = ``;
    let numeroDoNivel;
    for (let i = 0; i < numberOfLevels; i++){
        numeroDoNivel = i+1;
        levelBox += 
        `
        <div class="Ask-level-box">
            <h3>Nível ${numeroDoNivel}</h3>
            <div class="content content-level">
                <input placeholder="Título do nível" type="text" class="level-text">
                <input placeholder="% de acerto mínima"type="text" class="level-accuracy">
                <input placeholder="URL da imagem do nível" type="text" class="level-img">
                <input placeholder="Descrição do nível"type="text" class="level-description">
            </div>
         </div>
        `;
    }
    return levelBox;
}

function validateLevel(level){
    let level_question = level.querySelector(".level-text").value;
    if (validateLevelTitleLength(level_question) === false){
        return false
    } 
    
    let level_accuracy = level.querySelector(".level-accuracy").value;
    if (validateAllAccuracy(level_accuracy) === false){
        return false;
    }

    let level_img = level.querySelector(".level-img").value;
    if (validateImageUrl(level_img) === false){
        console.log(false);
        return false;
    }

    let level_description = level.querySelector(".level-description").value;
    if (validateLevelDescription(level_description) === false){
        console.log(false);
        return false;
    }

    
    return true;
}

function validateLevels(levels){
    for (let i = 0; i<levels.length; i++){
        if (validateLevel(levels[i]) === false){
            return false;
        }
    }
    return true;
}

function validateQuizzLevels(){
    let isOk = false;
    let contents = document.querySelectorAll(".content-level");
    isOk = validateLevels(contents);
    if (isOk){
        console.log("info dos niveis validada!");
    } 
    
    return isOk; 
}

function goToFinishQuizzScreen(){
    let isOk = validateQuizzLevels();
    console.log(isOk);
    if (isOk === true){
        let thirdScreen = document.querySelector(".create-levels-box");
        thirdScreen.classList.add("hidden");

        let Finished_quizz_box_screen = document.querySelector(".Finished-quizz-box");
        Finished_quizz_box_screen.classList.remove("hidden");
    }
}

function createLevelsQuizzScreen(){
    let thirdScreen = document.querySelector(".create-levels-box");
    thirdScreen.classList.remove("hidden");

    thirdScreen.innerHTML = 
    `

            <h2>Agora, decida os níveis</h2>
            ${createLevelsBox()}
            <div onclick="goToFinishQuizzScreen()" class="button"><p>Finalizar Quizz</p></div>

    `;
    CollapseBox();
}

function validateAllLevelTitleLength(titles){
    for (let i = 0; i<titles.length; i++){
        if (validateLevelTitleLength(titles[i]) === false){
            return false;
        }
    }
    return true;
}

function validateLevelTitleLength(titleText){
    console.log(titleText);
    if (titleText.length >= 10){
        return true;
    } else {
        return false;
    }
}

function validateAllAccuracy(accuracyLst){
    for (let i = 0; i<accuracyLst.length; i++){
        if (validateAccuracy(accuracyLst[i]) === false){
            return false;
        }
    }
    return true;
}

function validateAccuracy(accuracy){
    if (accuracy >= 0 && accuracy <= 100){
        return true;
    } else {
        return false;
    }
}

function validateAllLevelDescription(descriptions){
    for (let i = 0; i<descriptions.length; i++){
        if (validateLevelDescription(descriptions[i]) === false){
            return false;
        }
    }
    return true;
}

function validateLevelDescription(description){
    if (description.length >= 30){
        return true;
    } else {
        return false;
    }
}


//fim Criação do Quizz: Níveis do quizz




//lista dos Quizzes

function showQuizz(quizz){
    if (idUserPost.includes(quizz.id)){
        const content = document.querySelector(".grid")
        content.innerHTML += `<div class= "quizz" onclick = "showthirdScreen(this)"> 
        <div class = "card">
            <div class="front"></div>
            <img src=${quizz.image} alt =${quizz.id}/> 
            <span class = "quizzTitle" > ${quizz.title} </span> 
        </div> 
        </div>`
        return

    }
    const content = document.querySelector(".grid")
    content.innerHTML += `<div class= "quizz"> 
    <div class = "card" onclick = "showthirdScreen(this)">
        <div class="front"></div>
        <img src=${quizz.image} alt =${quizz.id}/> 
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


function showFirstScreen(){
    const content = document.querySelector("main")
    const firstScreen = document.querySelector(".main-box-basic-informations")
    content.classList.add("hidden")
    firstScreen.classList.remove("hidden")
}

function showthirdScreen(element){
    const content = document.querySelector("main")
    content.classList.add("hidden")
    const thirdScreen = document.querySelector(".PlayQuizzBox")
    thirdScreen.classList.remove("hidden")
    const id = element.getElementsByTagName('img')[0].alt
    const url = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
    axios.get(url)
        .then((response) => createThirdScreen(response.data))
        .catch((e) => console.log(e))
}

function createThirdScreen(response){
    const content = document.querySelector(".PlayQuizzBox")
    console.log(response)
    content.innerHTML = ""
    content.innerHTML += `<div class="thirdScreenCard">
    <div class="front"></div>
    <img  src=${response.image} alt="">
    <p class = "TitlePlayQuizz">${response.title}</p>
</div>`
    let j = 0
    response.questions.map((quizz) => {
        content.innerHTML += `<div class="QuizzBox">
        <div class="TitleQuizzBox"><p>${quizz.title}</p></div>
        <div class="QuizzAnswers">
        </div>
        </div>`
        quizz.answers.map((answer) => {
            console.log(answer)
            const target = content.querySelectorAll(".QuizzAnswers")[j]
            target.innerHTML +=
            `  <div class="AnswerImg">
                    <img class="" src=${answer.image} alt = ${answer.isCorrectAnswer}>
                    <p>${answer.text}</p>
                </div>`
        })
        j+=1
    })

};


function CollapseBox() {

    const element1 = document.getElementsByClassName("questions-box");

    for (let i = 0; i < element1.length; i++) {
      element1[i].addEventListener("click", function () {
        this.classList.add("active");
      });
    }



    const element2 = document.getElementsByClassName("Ask-level-box");

    for (let i = 0; i < element2.length; i++) {
      element2[i].addEventListener("click", function () {
        this.classList.add("active");
      });
    }
  }

