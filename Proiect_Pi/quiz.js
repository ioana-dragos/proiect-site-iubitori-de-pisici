document.querySelector(".buton-quiz1").addEventListener("click", function(e) {
  
    let userLogat = localStorage.getItem("userLogat");

if (!userLogat) {
    alert("Trebuie să ai un cont pentru a accesa quiz-ul!");
    window.location.href = "cont.html"; 
    }else {
        window.location.href = "quiz1.html"; 
    }

});

document.querySelector(".buton-quiz2").addEventListener("click", function(e) {
  
    let userLogat = localStorage.getItem("userLogat");

if (!userLogat) {
    alert("Trebuie să ai un cont pentru a accesa quiz-ul!");
    window.location.href = "cont.html"; 
    }else {
        window.location.href = "quiz2.html"; 
    }

});
