"""Clean, encode, scale, and split the hygiene risk dataset."""
import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

# --- Paths anchored to this file (works from any cwd) ---
HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.abspath(os.path.join(HERE, "..", "dataset", "facility_risk.csv"))
OUT_DIR = HERE

NUMERIC = ["cleanliness_score", "odor_score", "waste_level",
           "complaints", "footfall", "hours_since_cleaning"]
CATEGORICAL = ["location", "facility_type"]
TARGET = "hygiene_risk"


def main():
    print("=" * 60)
    print("PREPROCESSING")
    print("=" * 60)

    if not os.path.exists(RAW):
        print(f"[ERROR] Missing: {RAW}")
        print("Fix: run  python ../dataset/generate_data.py")
        return

    df = pd.read_csv(RAW)
    print(f"Loaded: {df.shape}")

    # ---- 1. Missing values ----
    print("\nMissing values before:")
    print(df.isnull().sum()[df.isnull().sum() > 0])

    for col in NUMERIC:
        df[col] = pd.to_numeric(df[col], errors="coerce")
        df[col] = df[col].fillna(df[col].median())

    df = df.dropna(subset=[TARGET])
    print(f"After imputation: {df.shape}")

    # ---- 2. Feature engineering ----
    df["odor_x_waste"] = df["odor_score"] * df["waste_level"]
    df["crowding_index"] = df["footfall"] / (df["cleanliness_score"] + 1)
    df["complaint_rate"] = df["complaints"] / (df["footfall"] + 1)
    df["hours_norm"] = df["hours_since_cleaning"] / 24.0
    print(f"After FE: {df.shape} (added 4 engineered features)")

    # ---- 3. Encode categoricals ----
    df = pd.get_dummies(df, columns=CATEGORICAL, drop_first=False)

    drop_cols = [c for c in ["facility_id", "inspection_date"] if c in df.columns]
    df = df.drop(columns=drop_cols)

    # ---- 4. Split features/target ----
    X = df.drop(columns=[TARGET])
    y = df[TARGET]
    print(f"\nFeatures: {X.shape[1]} | Samples: {X.shape[0]}")
    print(f"Target distribution:\n{y.value_counts()}")

    # ---- 5. Train/test split ----
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"\nTrain: {X_train.shape} | Test: {X_test.shape}")

    # ---- 6. Scale numeric ----
    scaler = StandardScaler()
    num_cols = [c for c in X_train.columns
                if X_train[c].dtype in [np.float64, np.int64]]
    X_train_scaled = X_train.copy()
    X_test_scaled = X_test.copy()
    X_train_scaled[num_cols] = scaler.fit_transform(X_train[num_cols])
    X_test_scaled[num_cols] = scaler.transform(X_test[num_cols])

    # ---- 7. Save ----
    X_train.to_csv(os.path.join(OUT_DIR, "X_train.csv"), index=False)
    X_test.to_csv(os.path.join(OUT_DIR, "X_test.csv"), index=False)
    X_train_scaled.to_csv(os.path.join(OUT_DIR, "X_train_scaled.csv"), index=False)
    X_test_scaled.to_csv(os.path.join(OUT_DIR, "X_test_scaled.csv"), index=False)
    y_train.to_csv(os.path.join(OUT_DIR, "y_train.csv"), index=False)
    y_test.to_csv(os.path.join(OUT_DIR, "y_test.csv"), index=False)
    joblib.dump(scaler, os.path.join(OUT_DIR, "scaler.joblib"))
    joblib.dump(list(X.columns), os.path.join(OUT_DIR, "feature_names.joblib"))
    joblib.dump(num_cols, os.path.join(OUT_DIR, "scaled_cols.joblib"))   # <-- NEW

    print(f"\n[OK] Saved preprocessed data to {OUT_DIR}")


if __name__ == "__main__":
    main()