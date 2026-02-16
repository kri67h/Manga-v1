import express from 'express';
import bodyParser from 'body-parser';
import { processImage, performOCR } from './imageProcessing'; // Assume these functions are implemented

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// API Endpoint for Image Processing
app.post('/api/process-image', async (req, res) => {
    try {
        const image = req.body.image; // Expecting base64 image
        const processedImage = await processImage(image);
        res.status(200).json({ processedImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Endpoint for OCR
app.post('/api/ocr', async (req, res) => {
    try {
        const image = req.body.image; // Expecting base64 image
        const text = await performOCR(image);
        res.status(200).json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
