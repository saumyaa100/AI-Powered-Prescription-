# MediRx AI: Intelligent Prescription Assistant-
📌 Overview
MediRx AI is an AI-powered Pharmacist’s Assistant designed to automate the process of interpreting handwritten prescriptions and matching them with medicine orders. This web-based platform provides an intuitive UI for pharmacists to upload prescriptions, view extracted details, and generate medicine orders efficiently.

🏗️ Project Structure
1️⃣ Frontend (HTML, CSS, JavaScript)
HTML: Defines the page structure, including an upload section, prescription display area, and order confirmation section.
CSS: Styles the UI for a clean and modern pharmacy dashboard look.
JavaScript: Handles file uploads, interacts with the backend (if implemented), and displays extracted prescription data dynamically.
🔧 Current Features & Functionality
1. HTML Structure (index.html)
Contains an upload button to allow users to upload prescription images.
Displays a preview of the uploaded prescription.
Section for showing extracted text and medicine order details.
2. CSS Styling (styles.css)
Provides a responsive layout for the UI.
Ensures a user-friendly interface with appropriate margins, colors, and font styles.
Styles buttons, input fields, and prescription preview sections.
3. JavaScript Logic (script.js)
Handles image uploads:
Captures user-uploaded prescription images and displays a preview.
Interacts with OCR API (Future Scope):
Will send the uploaded prescription image to an AI model for text extraction.
Displays extracted prescription text (Mock Data for Now):
Extracted medicine names and dosages are shown dynamically in a results section.

Upcoming Features
🔹 Backend API Integration – Connect JavaScript with OCR/NLP-based AI models.
🔹 AI-Powered Text Extraction – Use OCR to automatically extract medicine names and dosages.
🔹 Error Detection & Correction – Suggest corrections for unrecognized medicine names.
🔹 Order Generation & Confirmation – Create and finalize medicine orders.
