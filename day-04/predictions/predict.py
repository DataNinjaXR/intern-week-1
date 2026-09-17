"""Load best model, predict on test set + sample inputs."""
import os
import joblib
import pandas as pd
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
PREP = os.path.abspath(os.path.join(HERE, "..", "preprocessing"))
MODELS = os.path.abspath(os.path.join(HERE, "..", "models"))
OUT = HERE


def load_best():
    with open(os.path.join(MODELS, "best_model.txt")) as f:
        name = f.read().strip()
    if name == "Random Forest":
        model = joblib.load(os.path.join(MODELS, "random_forest.joblib"))
        X_test = pd.read_csv(os.path.join(PREP, "X_test.csv"))
    else:
        model = joblib.load(os.path.join(MODELS, "logistic_regression.joblib"))
        X_test = pd.read_csv(os.path.join(PREP, "X_test_scaled.csv"))
    return name, model, X_test


def main():
    name, model, X_test = load_best()
    y_test = pd.read_csv(os.path.join(PREP, "y_test.csv")).squeeze()

    preds = model.predict(X_test)
    probs = model.predict_proba(X_test)
    classes = model.classes_

    out = X_test.copy()
    out["actual"] = y_test.values
    out["predicted"] = preds
    out["correct"] = out["actual"] == out["predicted"]
    for i, c in enumerate(classes):
        out[f"prob_{c}"] = probs[:, i]

    out.to_csv(os.path.join(OUT, "test_predictions.csv"), index=False)
    acc = out["correct"].mean()
    print(f"[{name}] Test accuracy: {acc:.4f}")
    print(f"[OK] Saved test_predictions.csv ({len(out)} rows)")

    # ---- Sample predictions ----
    samples = pd.DataFrame([
        {"cleanliness_score": 9.0, "odor_score": 1.0, "waste_level": 1.0,
         "complaints": 0, "footfall": 50, "hours_since_cleaning": 2.0},
        {"cleanliness_score": 6.0, "odor_score": 5.0, "waste_level": 5.0,
         "complaints": 4, "footfall": 300, "hours_since_cleaning": 12.0},
        {"cleanliness_score": 2.0, "odor_score": 9.0, "waste_level": 9.0,
         "complaints": 20, "footfall": 900, "hours_since_cleaning": 72.0},
    ])

    # Match feature engineering from preprocess.py
    samples["odor_x_waste"] = samples["odor_score"] * samples["waste_level"]
    samples["crowding_index"] = samples["footfall"] / (samples["cleanliness_score"] + 1)
    samples["complaint_rate"] = samples["complaints"] / (samples["footfall"] + 1)
    samples["hours_norm"] = samples["hours_since_cleaning"] / 24.0

    # Load exact training columns and align
    feature_names = joblib.load(os.path.join(PREP, "feature_names.joblib"))
    for col in feature_names:
        if col not in samples.columns:
            samples[col] = 0
    samples = samples[feature_names]  # exact order

    # Scale only if the chosen model is Logistic Regression
    if name != "Random Forest":
        scaler = joblib.load(os.path.join(PREP, "scaler.joblib"))
        scaled_cols = joblib.load(os.path.join(PREP, "scaled_cols.joblib"))
        samples_scaled = samples.copy()
        samples_scaled[scaled_cols] = scaler.transform(samples[scaled_cols])
        samples = samples_scaled

    sample_preds = model.predict(samples)
    sample_probs = model.predict_proba(samples)

    sample_out = samples.copy()
    sample_out["predicted_risk"] = sample_preds
    for i, c in enumerate(classes):
        sample_out[f"prob_{c}"] = sample_probs[:, i]
    sample_out.to_csv(os.path.join(OUT, "sample_predictions.csv"), index=False)

    print("\nSample predictions:")
    print(sample_out[["cleanliness_score", "odor_score", "waste_level",
                      "predicted_risk"]].to_string(index=False))
    print(f"\n[OK] Saved sample_predictions.csv")


if __name__ == "__main__":
    main()