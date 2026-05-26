document.addEventListener('DOMContentLoaded', function() {
    
    // Definim funcția de incarcare
    async function incarcaCarti() {
        try {
            const raspuns = await fetch('http://localhost:8080/ai/resurse-pisici');
            
            if (!raspuns.ok) {
                throw new Error("Eroare la comunicarea cu serverul Java");
            }

            const date = await raspuns.json();
            const container = document.getElementById('biblioteca-container');

            // Verificam daca API-ul a returnat carti
            if (date.items && date.items.length > 0) {
                container.innerHTML = ""; 

                date.items.forEach(item => {
                    const info = item.volumeInfo;
                    const card = document.createElement('div');
                    card.className = 'card-carte';

                    // Extragem datele
                    const poza = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/150x200?text=Fara+Coperta';
                    const titlu = info.title;
                    const autor = info.authors ? info.authors[0] : 'Autor Necunoscut';
                    const link = info.previewLink;

                    card.innerHTML = `
                        <img src="${poza}" alt="Coperta ${titlu}">
                        <h3>${titlu}</h3>
                        <p>${autor}</p>
                        <a href="${link}" target="_blank" class="btn-citeste">Citește 📖</a>
                    `;

                    container.appendChild(card);
                });
            } else {
                container.innerHTML = "<p>Nu am găsit cărți momentan.</p>";
            }

        } catch (e) {
            console.error("Eroare JS:", e);
            document.getElementById('biblioteca-container').innerHTML = "<p>Eroare la încărcarea bibliotecii. Verifică dacă serverul Spring Boot este pornit!</p>";
        }
    }

    // Apelam functia
    incarcaCarti();
});