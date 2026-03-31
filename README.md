<div align="center">

# 🫀 CardioSense — AI-Powered Heart Disease Risk Assessment

![CardioSense Banner](https://img.shields.io/badge/CardioSense-v1.0-red?style=for-the-badge&logo=heart&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9%2B-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=flat-square&logo=fastapi)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML%20Model-orange?style=flat-square&logo=scikit-learn)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A full-stack AI web application that predicts the risk of heart disease based on clinical patient data, powered by a trained Machine Learning model and a modern dark luxury UI.**

</div>

---

## 📸 Screenshots

### 🖥️ Frontend — Step 1: Personal Info (Dark Luxury UI)

![CardioSense Frontend Screenshot](https://i.postimg.cc/NFznynhJ/Screenshot-2026-03-30-142213.png)

> *Multi-step form with ECG animation, dark luxury theme, and clean UX design.*

---

## 🌟 Features

- 🤖 **AI-Powered Prediction** — Uses a pre-trained ML model (joblib) to classify heart disease risk
- 🧾 **Multi-Step Form UI** — 3-step form (Personal → Clinical → Advanced) for intuitive data entry
- ⚡ **FastAPI Backend** — High-performance REST API with strict input validation via Pydantic
- 🎨 **Dark Luxury Design** — Custom dark theme with ECG heartbeat animation in the header
- 🔒 **Input Validation** — Server-side validation for all 13 clinical features, rejects empty/invalid values
- 🌐 **CORS Enabled** — Configured for seamless frontend–backend communication
- 📦 **Portable Model** — Pre-trained model stored as `heart_model.joblib`, loads at startup

---

## 🗂️ Project Structure

```
heart-disease-prediction-Ai_v1.0/
│
├── main.py                    # FastAPI backend (API routes, ML model, validation)
├── heart_model.joblib         # Pre-trained ML model (scikit-learn)
├── requirements.txt           # Python dependencies
├── .gitignore
│
├── dataset/                   # Dataset used for model training
│   └── heart.csv (or similar)
│
└── frontend/
    └── Frontend v1.0/
        ├── index.html         # Main HTML file (multi-step form)
        ├── style.css          # Dark luxury UI styling
        └── script.js          # Form logic, API calls, result rendering
        
    └── Frontend v2.0/
        ├── index.html         # Main HTML file (multi-step form)
        ├── style.css          # Dark luxury UI styling
        └── script.js          # Form logic, API calls, result rendering
```

---

## 🧠 Machine Learning Model

| Detail | Info |
|---|---|
| **Algorithm** | Classification (e.g., Random Forest / Logistic Regression) |
| **Input Features** | 13 clinical attributes (see below) |
| **Output** | Binary — `Heart Disease Detected` / `No Heart Disease` |
| **Model File** | `heart_model.joblib` |
| **Library** | scikit-learn + joblib |

### 📋 Input Features

| # | Feature | Description |
|---|---|---|
| 1 | `age` | Age of the patient |
| 2 | `sex` | Sex (0 = Female, 1 = Male) |
| 3 | `cp` | Chest pain type (0–3) |
| 4 | `trestbps` | Resting blood pressure (mm Hg) |
| 5 | `chol` | Serum cholesterol (mg/dl) |
| 6 | `fbs` | Fasting blood sugar > 120 mg/dl (1 = True) |
| 7 | `restecg` | Resting ECG results (0–2) |
| 8 | `thalach` | Maximum heart rate achieved |
| 9 | `exang` | Exercise-induced angina (0/1) |
| 10 | `oldpeak` | ST depression induced by exercise |
| 11 | `slope` | Slope of the peak exercise ST segment |
| 12 | `ca` | Number of major vessels colored by fluoroscopy |
| 13 | `thal` | Thalassemia (0 = Normal, 1 = Fixed Defect, 2 = Reversible Defect) |

---

## ⚙️ Backend — FastAPI

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check — confirms API is running |
| `POST` | `/predict` | Submit patient data, receive prediction |

### `/predict` — Request Body (JSON)

```json
{
  "age": 54,
  "sex": 1,
  "cp": 2,
  "trestbps": 130,
  "chol": 245,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.5,
  "slope": 2,
  "ca": 0,
  "thal": 2
}
```

### `/predict` — Response (JSON)

```json
{
  "prediction": 1,
  "result": "Heart Disease Detected"
}
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- pip
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/zerotwo5/heart-disease-prediction-Ai_v1.0.git
cd heart-disease-prediction-Ai_v1.0
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Backend Server

```bash
uvicorn main:app --reload
```

The API will be live at: `http://127.0.0.1:8000`

You can explore the interactive API docs at: `http://127.0.0.1:8000/docs`

### 4. Open the Frontend

Open the frontend in your browser:

```
frontend/Frontend v1.0/index.html
```

> Make sure your browser allows local file API calls, or serve it using a simple HTTP server:
> ```bash
> cd "frontend/Frontend v1.0"
> python -m http.server 5500
> ```
> Then visit `http://localhost:5500`

---

## 📦 Dependencies

```
fastapi
uvicorn
pydantic
joblib
numpy
scikit-learn
```

Install all with:

```bash
pip install -r requirements.txt
```

---

## 🎨 Frontend Design

The UI follows a **dark luxury** design system:

- ⬛ Deep dark background (`#0d0d0d` / `#111`)
- 🔴 Red accent color (`#e63946`) for interactive elements
- 💡 Subtle card glow and glassmorphism effects
- 💓 ECG heartbeat SVG animation in the header
- 📋 3-step wizard form with progress indicators:
  - **Step 1 — Personal:** Age, Sex, Chest Pain Type
  - **Step 2 — Clinical:** Blood pressure, Cholesterol, Blood Sugar, ECG, Heart Rate
  - **Step 3 — Advanced:** Exercise Angina, ST Depression, Slope, Vessels, Thalassemia

---

## ⚠️ Disclaimer

> This application is built for **educational and academic purposes only**.
> It is **not** a substitute for professional medical diagnosis.
> Always consult a qualified healthcare provider for medical decisions.

---

## 👨‍💻 Author

**zerotwo5**
- GitHub: [@zerotwo5](https://github.com/zerotwo5)
- Project: [heart-disease-prediction-Ai_v1.0](https://github.com/zerotwo5/heart-disease-prediction-Ai_v1.0)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made by md.pranto025 with ❤️ using FastAPI + scikit-learn
</div>
