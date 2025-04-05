// Password verification and ASCII art display
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-btn');
    const attemptsLeft = document.getElementById('attempts-left');
    const hintContainer = document.getElementById('hint-container');
    const asciiContainer = document.getElementById('ascii-art-container');
    const asciiOutput = document.getElementById('ascii-art-output');
    const terminalInput = document.getElementById('terminal-input');
    const passwordContainer = document.getElementById('password-container');
    const exploreMain = document.querySelector('.explore-main');
    const exploreHero = document.querySelector('.explore-hero');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    let attempts = 0;
    const maxAttempts = 3;
    const validPasswords = ['kanye', 'Kanye', 'KANYE', 'ye', 'Ye', 'YE'];
    let audioPlayer = null;

    const asciiArt = `
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║   ███████╗██╗  ██╗ █████╗ ███████╗ █████╗ ███╗   ██╗ █████╗ ███╗   ██╗    ║
    ║   ██╔════╝██║  ██║██╔══██╗╚══███╔╝██╔══██╗████╗  ██║██╔══██╗████╗  ██║    ║
    ║   ███████╗███████║███████║  ███╔╝ ███████║██╔██╗ ██║███████║██╔██╗ ██║    ║
    ║   ╚════██║██╔══██║██╔══██║ ███╔╝  ██╔══██║██║╚██╗██║██╔══██║██║╚██╗██║    ║
    ║   ███████║██║  ██║██║  ██║███████╗██║  ██║██║ ╚████║██║  ██║██║ ╚████║    ║
    ║   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝    ║
    ║                                                                              ║
    ║   Welcome to the hidden realm of creativity and innovation.                  ║
    ║   You've discovered something special.                                       ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
    `;

    function updateAttempts() {
        if (attempts < maxAttempts) {
            attemptsLeft.textContent = maxAttempts - attempts;
        }
        if (attempts >= maxAttempts) {
            hintContainer.style.display = 'block';
            hintContainer.style.animation = 'fadeIn 0.5s ease forwards';
            attemptsLeft.textContent = '∞';
        }
    }

    function showAsciiArt() {
        // Hide the password container and other page elements
        passwordContainer.style.display = 'none';
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (exploreMain) exploreMain.style.padding = '0';
        if (exploreHero) exploreHero.style.display = 'none';
        
        // Show and setup the terminal
        asciiContainer.style.display = 'block';
        setTimeout(() => {
            asciiContainer.classList.add('visible');
            asciiContainer.classList.add('fullscreen');
        }, 50);

        // Add typing effect for ASCII art
        const lines = asciiArt.split('\n');
        asciiOutput.textContent = '';
        let lineIndex = 0;
        let charIndex = 0;

        function typeLine() {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    asciiOutput.textContent += lines[lineIndex][charIndex];
                    charIndex++;
                    setTimeout(typeLine, 10);
                } else {
                    asciiOutput.textContent += '\n';
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 50);
                }
            } else {
                // After ASCII art is done, focus the terminal input
                terminalInput.focus();
            }
        }

        typeLine();
    }

    // Function to play the hidden audio
    function playHiddenAudio() {
        if (!audioPlayer) {
            audioPlayer = new Audio('ww3.mp3');
            audioPlayer.volume = 0.5;
        }
        
        // Add a visual indicator that something is happening
        asciiOutput.innerHTML += `<div class="command-output" style="color: #ff00ff;">[HIDDEN FEATURE ACTIVATED]</div>`;
        
        // Play the audio
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
            asciiOutput.innerHTML += `<div class="command-output" style="color: #ff0000;">Error playing audio: ${error.message}</div>`;
        });
    }

    // Handle terminal input
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            // Add the command to the output
            asciiOutput.innerHTML += `<div class="command-line"><span class="prompt">$</span> ${command}</div>`;
            
            // Check for hidden feature
            if (command.toLowerCase() === 'ye') {
                playHiddenAudio();
            }
            // Handle other commands
            else if (command.toLowerCase() === 'help') {
                asciiOutput.innerHTML += `<div class="command-output">Available commands:
- help: Show this help message
- clear: Clear the terminal
- about: Learn more about me
- exit: Close the terminal</div>`;
            } else if (command.toLowerCase() === 'clear') {
                asciiOutput.innerHTML = '';
            } else if (command.toLowerCase() === 'about') {
                asciiOutput.innerHTML += `<div class="command-output">I'm Shazaan, a creative developer inspired by fashion and innovation.
This terminal is a hidden feature of my portfolio website.</div>`;
            } else if (command.toLowerCase() === 'exit') {
                // Stop audio if playing
                if (audioPlayer) {
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                }
                
                // Exit fullscreen mode
                asciiContainer.classList.remove('fullscreen');
                
                // Show the password container and other page elements
                asciiContainer.style.display = 'none';
                passwordContainer.style.display = 'block';
                if (header) header.style.display = 'block';
                if (footer) footer.style.display = 'block';
                if (exploreMain) exploreMain.style.padding = '';
                if (exploreHero) exploreHero.style.display = 'block';
                
                passwordInput.value = '';
                attempts = 0;
                updateAttempts();
            } else {
                asciiOutput.innerHTML += `<div class="command-output">Command not found. Type 'help' for available commands.</div>`;
            }
            
            // Clear the input and scroll to bottom
            terminalInput.value = '';
            asciiOutput.scrollTop = asciiOutput.scrollHeight;
        }
    });

    submitButton.addEventListener('click', () => {
        const password = passwordInput.value.trim();
        
        if (validPasswords.includes(password)) {
            showAsciiArt();
            passwordInput.disabled = true;
            submitButton.disabled = true;
        } else {
            attempts++;
            updateAttempts();
            passwordInput.value = '';
            
            if (attempts >= maxAttempts) {
                passwordInput.disabled = false;
                submitButton.disabled = false;
            }
        }
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitButton.click();
        }
    });
}); 