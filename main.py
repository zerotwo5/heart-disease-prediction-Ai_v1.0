from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
import joblib
import numpy as np
import os

# ==============================
# Load ML model (safe path)
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "heart_model.joblib")

if not os.path.exists(MODEL_PATH):
    raise RuntimeError("❌ heart_model.joblib file not found")

model = joblib.load(MODEL_PATH)

# ==============================
# FastAPI app
# ==============================
app = FastAPI(
    title="Heart Disease Prediction API",
    version="1.0"
)

# ==============================
# CORS (Frontend connect)
# ==============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # production এ specific domain দিবে
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# Input Schema with STRICT validation
# ==============================
class HeartInput(BaseModel):
    age: int = Field(..., gt=0, description="Age must be > 0")
    sex: int = Field(..., ge=0, le=1)
    cp: int = Field(..., ge=0)
    trestbps: int = Field(..., gt=0)
    chol: int = Field(..., gt=0)
    fbs: int = Field(..., ge=0, le=1)
    restecg: int = Field(..., ge=0)
    thalach: int = Field(..., gt=0)
    exang: int = Field(..., ge=0, le=1)
    oldpeak: float = Field(..., ge=0)
    slope: int = Field(..., ge=0)
    ca: int = Field(..., ge=0)
    thal: int = Field(..., ge=0)

    # Blank / empty check
    @field_validator("*", mode="before")
    @classmethod
    def no_blank_value(cls, v):
        if v is None or v == "":
            raise ValueError("Field cannot be blank")
        return v

# ==============================
# Routes
# ==============================
@app.get("/")
def health():
    return {"status": "API running successfully"}

@app.post("/predict")
def predict(data: HeartInput):

    values = list(data.model_dump().values())


    features = np.array([values])

    prediction = model.predict(features)[0]

    return {
        "prediction": int(prediction),
        "result": "Heart Disease Detected" if prediction == 1 else "No Heart Disease"
    }
