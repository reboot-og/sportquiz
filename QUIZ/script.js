async function fetchdata(){
    try{
        const response = await fetch("https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple");
        if(!response.ok){
            throw new Error("Data couldn't be fetched");
        }
        const data = await response.json();
        const main = data.results[0];
        document.getElementById("question").textContent = "Q. " +  main.question;
        let numbers = [1,2,3,4];
        
        for (let i = 4; i>1; i-=1){
            index = Math.floor((Math.random()*i*10)/10);
            id = "option " + String(numbers[index])
            document.getElementById(id).textContent = main.incorrect_answers[i-2];
            numbers.splice(index, 1);
        }
        id = "option " + String(numbers[0])
        document.getElementById(id).textContent = main.correct_answer;
        const submit = await document.getElementById("submit");
        submit.addEventListener("click", () => {const ans = document.getElementsByClassName("clicked")[0]
        if (ans.id == id) {
            document.getElementById(id).classList.add("correct");
        }
        else{ans.classList.add("incorrect");
        }
        submit.textContent = "NEXT";
        submit.addEventListener("click", () => {
        window.location.href = "quiz.html";});
        });
    }
    catch(error){
        console.error(error);
    }
}

const buttons = [
  document.getElementById("option 1"),
  document.getElementById("option 2"),
  document.getElementById("option 3"),
  document.getElementById("option 4")
];

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("clicked"));
    btn.classList.add("clicked");
  });
});

fetchdata();

