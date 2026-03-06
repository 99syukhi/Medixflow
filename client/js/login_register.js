/**
 * TOONT HET INLOGFORMULIER OP BASIS VAN DE ROL
 */
function showLoginForm(role) {
    const roleSelection = document.getElementById('role-selection');
    const subtitle = document.getElementById('form-subtitle');
    const patientForm = document.getElementById('patient-form');
    const adminForm = document.getElementById('admin-form');

    // Verberg de grid met rollen
    roleSelection.style.display = 'none';

    if (role === 'patient') {
        patientForm.style.display = 'block';
        subtitle.innerText = "Inloggen als Patiënt";
    } else {
        adminForm.style.display = 'block';
        subtitle.innerText = "Inloggen Systeem (Administratie)";
    }
}

/**
 * RESET DE LOGIN SECTIE NAAR DE ROLKEUZE
 */
function resetLogin() {
    document.getElementById('patient-form').style.display = 'none';
    document.getElementById('admin-form').style.display = 'none';
    document.getElementById('role-selection').style.display = 'grid';
    document.getElementById('form-subtitle').innerText = "Selecteer uw rol om verder te gaan";
}

/**
 * WISSELT TUSSEN LOGIN EN REGISTRATIE SECTIES
 */
function showForm(target) {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');

    if (target === 'register') {
        loginSection.style.display = 'none';
        registerSection.style.display = 'flex';
    } else {
        loginSection.style.display = 'flex';
        registerSection.style.display = 'none';
        resetLogin(); // Altijd terug naar de rolkeuze
    }
}

/**
 * TOGGLE WACHTWOORD ZICHTBAARHEID
 * Werkt voor elk inputId dat wordt meegegeven
 */
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const wrapper = passwordInput.parentElement;
    
    // Selecteer de oog-iconen binnen de wrapper van dit specifieke veld
    const eyeOff = wrapper.querySelector('.lucide-eye-off');
    const eyeOn = wrapper.querySelector('.lucide-eye');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (eyeOff) eyeOff.style.display = 'none';
        if (eyeOn) eyeOn.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        if (eyeOff) eyeOff.style.display = 'block';
        if (eyeOn) eyeOn.style.display = 'none';
    }
}