const express = require('express');
const session = require('express-session'); // Nieuw: installeer met 'npm install express-session'
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./db'); 
require('dotenv').config({ path: '../.env' });

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- DE REGISTRATIE ROUTE ---
app.post('/register', async (req, res) => {
    const { 
        name, 
        surname, 
        "ID-nummer": idNum, 
        "e-mail": email, 
        wachtwoord, 
        wachtwoord_confirm 
    } = req.body;

    if (wachtwoord !== wachtwoord_confirm) {
        return res.send("<script>alert('Wachtwoorden komen niet overeen!'); window.history.back();</script>");
    }

    try {
        const hashedPassword = await bcrypt.hash(wachtwoord, 10);
        const sql = "INSERT INTO gebruikers (voornaam, achternaam, id_nummer, email, wachtwoord, rol) VALUES (?, ?, ?, ?, ?, 'patient')";
        
        await db.query(sql, [name, surname, idNum, email, hashedPassword]);
        
        res.send("<script>alert('Registratie gelukt!'); window.location.href='/login_register.html';</script>");
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.send("<script>alert('Email of ID reeds in gebruik.'); window.history.back();</script>");
        } else {
            res.status(500).send("Database fout.");
        }
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server draait op http://localhost:${PORT}`);
});