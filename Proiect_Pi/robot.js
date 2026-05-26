document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById("btn-trimite");
    const input = document.getElementById("mesaj-user");
    const zonaMesaje = document.getElementById("zonaMesaje");

    btn.addEventListener("click", async () => {
        const mesaj = input.value.trim();
        const userId = localStorage.getItem('userId'); 

        if (!mesaj) return;
        
        if (!userId) {
            alert("Trebuie să fii logată pentru a vorbi cu robotul!");
            return;
        }

        const divUser = document.createElement("div");
        divUser.className = "mesaj mesaj-user";
        divUser.textContent = mesaj;
        zonaMesaje.appendChild(divUser);

        input.value = "";

        try {
            const response = await fetch(`http://localhost:8080/ai/intreaba`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `mesaj=${encodeURIComponent(mesaj)}&userId=${encodeURIComponent(userId)}`
            });
            
            if (!response.ok) {
                throw new Error("Eroare server: " + response.status);
            }

            const textRobot = await response.text(); 

            const divRobot = document.createElement("div");
            divRobot.className = "mesaj mesaj-robot";
            divRobot.textContent = textRobot; 
            zonaMesaje.appendChild(divRobot);

            zonaMesaje.scrollTop = zonaMesaje.scrollHeight;

        } catch (err) {
            console.error(err);
            alert("Robotul nu a putut răspunde. Verifică dacă Spring Boot rulează și ești logată.");
        }
    });
});