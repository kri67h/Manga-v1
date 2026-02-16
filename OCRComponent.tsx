import React, { useState } from 'react';
import axios from 'axios';

const OCRComponent = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image) return;

        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post('https://api.gemini.com/ocr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setText(response.data.text);
        } catch (error) {
            console.error('Error fetching the text from OCR:', error);
            setText('Error fetching text. Please try again.');
        }
    };

    return (
        <div>
            <h2>OCR Functionality</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Extracted Text:</h3>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default OCRComponent;