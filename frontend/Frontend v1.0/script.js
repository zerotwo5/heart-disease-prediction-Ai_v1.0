function predict() {
    const inputs = document.querySelectorAll("input, select");

    for (let input of inputs) {
        if (input.value === "" || isNaN(input.value)) {
            alert("❌ Please enter valid numeric values in all fields");
            return;
        }
    }
    const data = {
        age: Number(age.value),
        sex: Number(sex.value),
        cp: Number(cp.value),
        trestbps: Number(trestbps.value),
        chol: Number(chol.value),
        fbs: Number(fbs.value),
        restecg: Number(restecg.value),
        thalach: Number(thalach.value),
        exang: Number(exang.value),
        oldpeak: Number(oldpeak.value),
        slope: Number(slope.value),
        ca: Number(ca.value),
        thal: Number(thal.value)
    };

    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Predicting...";
    resultDiv.style.color = "#333";

    fetch("https://heart-disease-prediction-ai-v1-0.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        resultDiv.innerText = result.result;
        resultDiv.style.color =
            result.result.toLowerCase().includes("no") ? "green" : "red";
    })
    .catch(err => {
        resultDiv.innerText = "API Error";
        resultDiv.style.color = "red";
        console.error(err);
    });
}

function clearForm() {
    const inputs = document.querySelectorAll("input, select");

    inputs.forEach(input => {
        input.value = "";
    });

    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "";
}
