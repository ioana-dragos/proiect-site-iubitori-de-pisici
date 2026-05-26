document.addEventListener('DOMContentLoaded', function() {
    
    function ActiveazaButon() {
        const butonModifica = document.getElementById("buton-modifica");
        if(butonModifica) {
            butonModifica.addEventListener("click", function() {
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
            });
        }
    }

    const numeLogat = localStorage.getItem('userNume');

    if(numeLogat) {
       
        if(document.getElementById("fereastra-cont")) document.getElementById("fereastra-cont").classList.add("ascuns");
        if(document.getElementById("fereastra-conectat")) document.getElementById("fereastra-conectat").classList.remove("ascuns");

        if(document.getElementById("nume-logat")) document.getElementById("nume-logat").value = numeLogat;
        if(document.getElementById("email-logat")) document.getElementById("email-logat").value = localStorage.getItem("userEmail") || "";
        
        ActiveazaButon(); 
    }

    const butonLogout = document.getElementById("buton-logout");
    if(butonLogout) {
        butonLogout.addEventListener("click", function() {   
            localStorage.clear();
            window.location.reload();
        });
    }

    const butonRegister = document.querySelector(".buton-register");
    if(butonRegister) {
        butonRegister.addEventListener("click", function(e) {
            e.preventDefault();

            let nume = document.getElementById("nume").value;
            let email = document.getElementById("email").value;
            let parola = document.getElementById("parola").value;

            const bodyData = `nume=${encodeURIComponent(nume)}&email=${encodeURIComponent(email)}&parola=${encodeURIComponent(parola)}`; 

            fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: bodyData
            })
            .then(response => {
                if(!response.ok) throw new Error("Eroare la server");
                return response.json();
            })
            .then(data => {
                alert("Cont creat!");
                localStorage.setItem('userNume', data.nume || nume);
                localStorage.setItem('userEmail', data.email || email);
                localStorage.setItem('userParola', parola); 
                localStorage.setItem('userId', data.id); 
                window.location.reload();
            })
            .catch(error => {
                console.error('Eroare:', error);
                alert('E-mail deja folosit sau eroare server');
            });
        });
    }
});