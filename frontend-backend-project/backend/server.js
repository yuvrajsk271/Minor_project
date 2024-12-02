const express = require('express');
const multer = require('multer');
const axios = require('axios');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup for Multer (image uploads)
const upload = multer({ dest: 'uploads/' });

// Setup MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'image_db',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Endpoint to handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const filePath = path.join(__dirname, req.file.path);

        // Send the image path to the Python model API
        const modelResponse = await axios.post('http://127.0.0.1:5000/process', {
            imagePath: filePath,
        });

        const matchResult = modelResponse.data.result;

        // Optionally query the database for matches
        if (matchResult === 'Matched') {
            db.query('SELECT * FROM images WHERE image_name = ?', [req.file.originalname], (err, results) => {
                if (err) {
                    return res.status(500).send('Database query failed.');
                }
                res.status(200).json({ match: 'Matched', data: results });
            });
        } else {
            res.status(200).json({ match: 'Not Matched' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing image.');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
