document.addEventListener('DOMContentLoaded', function() {

     function ActiveazaButon()
     {
          const butonModifica = document.getElementById("buton-modifica");
          if(butonModifica) {
               butonModifica.onclick = function() {
                    const email = document.getElementById("email-logat").value;
                    const parolaNoua = document.getElementById("parola-logat").value;
                    const parolaVeche = localStorage.getItem('userParola');

                    if(!parolaNoua) {
                         alert("Te rog scrie o parola noua!");
                         return;
                    }
                    if(parolaNoua === parolaVeche) {
                         alert("Noua parolă nu poate fi identică cu cea actuală!");
                         return;
                    }

                    fetch('http://localhost:8080/users/modificare-parola', {
                         method:'POST',
                         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                         body: `email=${encodeURIComponent(email)}&parolaNoua=${encodeURIComponent(parolaNoua)}`
                    })
                    .then(res => res.text())
                    .then(mesaj => {
                         alert(mesaj);
                         localStorage.setItem('userParola', parolaNoua); 
                         document.getElementById("parola-logat").value = "";
                    });
               };
            }
        }

    const numeLogat=localStorage.getItem('userNume');
    if(numeLogat)
    {
        document.getElementById("fereastra-vizitator").classList.add("ascuns");
        document.getElementById("fereastra-conectat").classList.remove("ascuns");

        document.getElementById("nume-logat").value=numeLogat;
        document.getElementById("email-logat").value=localStorage.getItem("userEmail") || "";
        ActiveazaButon();
    }

    const buton = document.querySelector(".buton-register");
    if(buton)
    {
        buton.addEventListener("click", function(e){
        e.preventDefault();

        let nume=document.getElementById("nume").value;
        let email = document.getElementById("email").value;
        let parola = document.getElementById("parola").value;
    
        const dateDeTrimis=`nume=${encodeURIComponent(nume)}&email=${encodeURIComponent(email)}&parola=${encodeURIComponent(parola)}`;

        fetch('http://localhost:8080/users/login',
        {
                method:'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: dateDeTrimis
        })
        .then(response => {
            if(!response.ok) throw new Error("Date incorecte");
            return response.json();
        })
        .then(data=>{
            if(data)
            {
               alert(data.mesaj || "Logare reusita!");
               let numeUser = data.nume || nume || "Utilizator";

               localStorage.setItem('userLogat','true');
               localStorage.setItem('userEmail',email);
               localStorage.setItem('userNume',numeUser);
               localStorage.setItem('userparola',parola);
               localStorage.setItem('userId', data.id);

               document.getElementById("fereastra-vizitator").classList.add("ascuns");
               document.getElementById("fereastra-conectat").classList.remove("ascuns");

               document.getElementById("nume-logat").value=numeUser;
               document.getElementById("email-logat").value=email;
               ActiveazaButon();
            }
        })
        .catch(err=>{
            console.error("Eroare la conectare:",err);
            alert("Eroare de conexiune sau date incorecte");
            });
        });
    }
     const butonLogout=document.getElementById("buton-logout");
    if(butonLogout)
    {
        butonLogout.addEventListener("click",function()
        {   
            localStorage.clear();
            window.location.reload();
        });
    }
});