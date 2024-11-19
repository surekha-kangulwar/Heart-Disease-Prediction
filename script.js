document.getElementById("prediction-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        chestPain: document.getElementById("chestPain").value,
        restingBP: document.getElementById("restingBP").value,
        cholesterol: document.getElementById("cholesterol").value,
        fastingBS: document.getElementById("fastingBS").value,
        restECG: document.getElementById("restECG").value,
        maxHeartRate: document.getElementById("maxHeartRate").value,
        exerciseInduced: document.getElementById("exerciseInduced").value,
        stDepression: document.getElementById("stDepression").value,
        slopeOfST: document.getElementById("slopeOfST").value,
        majorVessels: document.getElementById("majorVessels").value,
        thalassemia: document.getElementById("thalassemia").value
    };

    const errors = [];

    // Validation
    if (formData.age < 1 || formData.age > 120) {
        errors.push("Age must be between 1 and 120.");
    }
    if (formData.gender < 0 || formData.gender > 1) {
        errors.push("Gender must be 0 (Female) or 1 (Male).");
    }
    if (formData.chestPain < 0 || formData.chestPain > 3) {
        errors.push("Chest Pain Type must be between 0 and 3.");
    }
    if (formData.restingBP < 50 || formData.restingBP > 200) {
        errors.push("Resting BP must be between 50 and 200.");
    }
    if (formData.cholesterol < 100 || formData.cholesterol > 600) {
        errors.push("Cholesterol must be between 100 and 600.");
    }
    if (formData.fastingBS < 0 || formData.fastingBS > 1) {
        errors.push("Fasting BS must be 0 (False) or 1 (True).");
    }
    if (formData.restECG < 0 || formData.restECG > 2) {
        errors.push("Rest ECG must be between 0 and 2.");
    }
    if (formData.maxHeartRate < 60 || formData.maxHeartRate > 220) {
        errors.push("Max Heart Rate must be between 60 and 220.");
    }
    if (formData.exerciseInduced < 0 || formData.exerciseInduced > 1) {
        errors.push("Exercise Induced Angina must be 0 (False) or 1 (True).");
    }
    if (formData.stDepression < 0 || formData.stDepression > 10) {
        errors.push("ST Depression must be between 0 and 10.");
    }
    if (formData.slopeOfST < 0 || formData.slopeOfST > 2) {
        errors.push("Slope of ST must be between 0 and 2.");
    }
    if (formData.majorVessels < 0 || formData.majorVessels > 3) {
        errors.push("Major Vessels must be between 0 and 3.");
    }
    if (formData.thalassemia < 0 || formData.thalassemia > 3) {
        errors.push("Thalassemia must be between 0 and 3.");
    }

    // If errors are found, display them and return
    if (errors.length > 0) {
        alert("Please correct the following errors:\n" + errors.join("\n"));
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        const prediction = result.prediction;

        // Display the prediction result on the browser
        document.getElementById('output').innerHTML = `<h2>Prediction: ${prediction == 1 ? 'Heart Disease Detected' : 'No Heart Disease Detected'}</h2>`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerHTML = '<h2>Error making prediction</h2>';
    }
});
