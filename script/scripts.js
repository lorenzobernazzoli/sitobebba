// Funzione per cambiare tema
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.toggle("dark-mode");

    // Memorizza il tema in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Funzione per applicare il tema salvato dal localStorage
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Applica il tema salvato quando la pagina viene caricata
applySavedTheme();

document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.querySelector('.play-button');
    const vinyl = document.querySelector('.vinyl-image');
    const audioPlayer = document.querySelector('#audio-player');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeDisplay = document.querySelector('.current-time');
    const totalTimeDisplay = document.querySelector('.total-time');

    // Funzione per aggiornare il tempo e la barra di progresso
    function updateProgress() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        if (!duration) return;

        // Calcola il tempo corrente (formato minuti:secondi)
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

        // Calcola il tempo totale (formato minuti:secondi)
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

        // Calcola il progresso come percentuale
        const progress = (currentTime / duration) * 100;

        // Aggiorna il riempimento della barra
        progressFill.style.width = `${progress}%`;
    }

    // Funzione per cambiare la posizione del progresso se l'utente la sposta manualmente
    progressBar.addEventListener('input', function () {
        const newTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    });

    // Evento che si attiva quando l'audio è pronto
    audioPlayer.addEventListener('loadedmetadata', function () {
        updateProgress(); // Assicurati di mostrare il tempo totale inizialmente
    });

    // Evento che si attiva ogni volta che l'audio cambia
    audioPlayer.addEventListener('timeupdate', function () {
        updateProgress(); // Aggiorna la barra di progresso e il tempo
    });

    // Gestione del pulsante Play/Pause
    playButton.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play(); // Riproduce la musica
            vinyl.classList.add('playing'); // Aggiungi la classe 'playing' per far girare il vinile
            playButton.textContent = '⏸️'; // Cambia l'icona del pulsante
        } else {
            audioPlayer.pause(); // Metti in pausa la musica
            vinyl.classList.remove('playing'); // Rimuovi la classe 'playing' per fermare la rotazione
            playButton.textContent = '▶'; // Cambia l'icona del pulsante
        }
    });
});

