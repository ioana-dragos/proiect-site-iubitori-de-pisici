document.addEventListener('DOMContentLoaded', function() {

    const userConectat = localStorage.getItem('userNume');
    const sectiuneAdaugare = document.getElementById('sectiune-adaugare'); 
    
    if (userConectat && sectiuneAdaugare) {
        sectiuneAdaugare.classList.remove("ascuns");
    }

    function incarcaPostari() {
        const listaDiv = document.getElementById('lista-postari');
        if (!listaDiv) return;

        listaDiv.innerHTML = "<p>Se încarca postarile...</p>";

        fetch('http://localhost:8080/postari/toate')
        .then(response => response.json()) 
        .then(postari => {
            listaDiv.innerHTML = ""; 

            if (postari.length === 0) {
                listaDiv.innerHTML = "<p>Nu există nicio postare încă.</p>";
                return;
            }

            postari.forEach(postare => {
            let htmlPoza = "";
            if (postare.numePoza) {
                htmlPoza = `<img src="http://localhost:8080/poze/${postare.numePoza}" class="poza-postare">`;
            }

            const numeDeAfisat = postare.numeAutor || "Utilizator " + postare.userId;

            const card = `
                <div class="card-postare">
                    <h4 class="titlu-autor">Postat de: ${numeDeAfisat}</h4>
                    <p class="text-descriere">${postare.descriere}</p>
                    ${htmlPoza}
                    <small class="data-postare">${postare.dataPostare}</small>
                </div>
            `;
            listaDiv.innerHTML += card;
        });
        })
    }

    const btnPosteaza = document.getElementById('btn-posteaza');
    if (btnPosteaza) {
        btnPosteaza.addEventListener('click', function() {
            
            console.log("ID trimis la SQL:", localStorage.getItem('userId'));

            const campText = document.getElementById('text-postare');
            const textScris = campText.value;
            const inputImagine = document.getElementById('imagine-postare');
            const fisierImagine = (inputImagine && inputImagine.files.length > 0) ? inputImagine.files[0] : null;

            const formData = new FormData();
            formData.append('numeAutor', userConectat);
            formData.append('descriere', textScris);
  
            formData.append('userId', localStorage.getItem('userId')); 
            
            if (fisierImagine) {
                formData.append('fisierPoza', fisierImagine);
            }

            fetch('http://localhost:8080/postari/adauga', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) return response.text();
                throw new Error("Eroare server");
            })
            .then(mesaj => {
                alert("Succes: " + mesaj);
                campText.value = "";
                const inputImagine = document.getElementById('imagine-postare');
                if (inputImagine) {
                    inputImagine.value = ""; 
                }
                incarcaPostari(); 
            })
            .catch(error => {
                alert("Nu s-a putut trimite. Esti logata?");
            });
        });
    }

    incarcaPostari();
});