let ScorPisica = { Abisiniana: 0, Siameză: 0, Russian_Blue: 0, MaineCoon: 0 };
let pasCurent = 0;
const intrebari = document.querySelectorAll(".pas-quiz");

document.getElementById("rezultat").addEventListener("click", function() {
    
    let raspuns = document.querySelector(`input[name="q${pasCurent + 1}"]:checked`);
    
    if (raspuns) {
        let tip = raspuns.value;
        ScorPisica[tip]++;
        
        intrebari[pasCurent].classList.remove("activ");
        
        pasCurent++;

        if (pasCurent < intrebari.length) {
            intrebari[pasCurent].classList.add("activ");
        } 
        else {
            let max = 0;
            let pisicaFinala = "";
            
            for (let tip in ScorPisica) {
                if (ScorPisica[tip] > max) {
                    max = ScorPisica[tip];
                    pisicaFinala = tip;
                }
            }

            document.getElementById("rezultat").style.display = "none";

            if (pisicaFinala == "Russian_Blue") {
                document.getElementById("output").innerHTML = `
                    <p class="intrebare-quiz">Rezultatul tău:</p> 
                    <p style="font-size: 30px; color: #000066; font-weight: bold;"> Ți se potrivește pisica Russian Blue! 🐱</p>`;
            } 
            else if (pisicaFinala == "MaineCoon") { 
                document.getElementById("output").innerHTML = `
                    <p class="intrebare-quiz">Rezultatul tău:</p> 
                    <p style="font-size: 30px; color: #000066; font-weight: bold;"> Ți se potrivește pisica Maine Coon! 🐱</p>`;
            } 
            else {
                document.getElementById("output").innerHTML = `
                    <p class="intrebare-quiz">Rezultatul tău:</p> 
                    <p style="font-size: 30px; color: #000066; font-weight: bold;"> Ți se potrivește pisica ${pisicaFinala}! 🐱</p>`;
            }
        }
    } 
    else {
        alert("Alege un răspuns! 🐾");
    }
});