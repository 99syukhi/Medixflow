console.log("Script geladen...");

document.addEventListener('DOMContentLoaded', () => {

    window.showForm = function() {
        const loginSection = document.getElementById('login-section');
        const registerSection = document.getElementById('register-section');

        if (loginSection.style.display !== "none") {
            loginSection.style.display = "none";
            registerSection.style.display = "flex";
        } else {
            loginSection.style.display = "flex";
            registerSection.style.display = "none";
        }
    };

    const annulerenButtons = document.querySelectorAll('.annuleren');
    annulerenButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    });

    function setupPasswordToggle(toggleId, inputId, eyeOnId, eyeOffId) {
        const btn = document.getElementById(toggleId);
        const input = document.getElementById(inputId);
        const iconOn = document.getElementById(eyeOnId);
        const iconOff = document.getElementById(eyeOffId);

        if (btn && input) {
            btn.addEventListener('click', () => {
                const isPassword = input.type === 'password';
                
                input.type = isPassword ? 'text' : 'password';
                
                iconOn.style.display = isPassword ? 'block' : 'none';
                iconOff.style.display = isPassword ? 'none' : 'block';
            });
        }
    }

    setupPasswordToggle('togglePassword', 'wachtwoord', 'eye-on', 'eye-off');

    setupPasswordToggle('toggleReg', 'wachtwoord-reg', 'eye-on-reg', 'eye-off-reg');

    setupPasswordToggle('toggleConf', 'wachtwoord-conf', 'eye-on-conf', 'eye-off-conf');

    const regPass = document.getElementById('wachtwoord-reg');
    const confPass = document.getElementById('wachtwoord-conf');

    if (regPass && confPass) {
        const validatePasswords = () => {
            if (confPass.value === "") {
                confPass.style.borderColor = "#ccc"; 
            } else if (regPass.value === confPass.value) {
                confPass.style.borderColor = "#3A5B22";
            } else {
                confPass.style.borderColor = "#e74c3c";
            }
        };

        regPass.addEventListener('input', validatePasswords);
        confPass.addEventListener('input', validatePasswords);
    }
});