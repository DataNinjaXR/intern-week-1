"""Train & compare two classifiers for hygiene risk."""
import os
import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                             f1_score, classification_report, confusion_matrix)

# --- Paths anchored to this file ---
HERE = os.path.dirname(os.path.abspath(__file__))
PREP = os.path.abspath(os.path.join(HERE, "..", "preprocessing"))
MODELS = HERE
EVAL = os.path.abspath(os.path.join(HERE, "..", "evaluation"))
os.makedirs(MODELS, exist_ok=True)
os.makedirs(EVAL, exist_ok=True)


def evaluate(name, model, X_tr, y_tr, X_te, y_te):
    model.fit(X_tr, y_tr)
    preds = model.predict(X_te)

    metrics = {
        "model": name,
        "accuracy":  accuracy_score(y_te, preds),
        "precision": precision_score(y_te, preds, average="weighted", zero_division=0),
        "recall":    recall_score(y_te, preds, average="weighted", zero_division=0),
        "f1":        f1_score(y_te, preds, average="weighted", zero_division=0),
    }
    print(f"\n--- {name} ---")
    for k, v in metrics.items():
        if k != "model":
            print(f"  {k:10s}: {v:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_te, preds, zero_division=0))

    cm = confusion_matrix(y_te, preds, labels=model.classes_)
    cm_df = pd.DataFrame(cm, index=model.classes_, columns=model.classes_)
    cm_df.to_csv(os.path.join(EVAL, f"cm_{name.replace(' ', '_').lower()}.csv"))

    return model, metrics, preds


def main():
    print("=" * 60)
    print("MODEL TRAINING & COMPARISON")
    print("=" * 60)

    X_train_s = pd.read_csv(os.path.join(PREP, "X_train_scaled.csv"))
    X_test_s  = pd.read_csv(os.path.join(PREP, "X_test_scaled.csv"))
    X_train   = pd.read_csv(os.path.join(PREP, "X_train.csv"))
    X_test    = pd.read_csv(os.path.join(PREP, "X_test.csv"))
    y_train   = pd.read_csv(os.path.join(PREP, "y_train.csv")).squeeze()
    y_test    = pd.read_csv(os.path.join(PREP, "y_test.csv")).squeeze()

    results = []

    lr = LogisticRegression(max_iter=2000, random_state=42)
    lr, m1, p1 = evaluate("Logistic Regression", lr,
                          X_train_s, y_train, X_test_s, y_test)
    results.append(m1)
    joblib.dump(lr, os.path.join(MODELS, "logistic_regression.joblib"))

    rf = RandomForestClassifier(n_estimators=300, max_depth=12,
                                min_samples_split=5, random_state=42, n_jobs=-1)
    rf, m2, p2 = evaluate("Random Forest", rf,
                          X_train, y_train, X_test, y_test)
    results.append(m2)
    joblib.dump(rf, os.path.join(MODELS, "random_forest.joblib"))

    df_res = pd.DataFrame(results).set_index("model").round(4)
    print("\n" + "=" * 60)
    print("MODEL COMPARISON")
    print("=" * 60)
    print(df_res)
    df_res.to_csv(os.path.join(EVAL, "model_comparison.csv"))

    best = df_res["f1"].idxmax()
    print(f"\n[BEST] Model: {best} (weighted F1 = {df_res.loc[best, 'f1']:.4f})")

    if hasattr(rf, "feature_importances_"):
        feat_imp = pd.DataFrame({
            "feature": X_train.columns,
            "importance": rf.feature_importances_,
        }).sort_values("importance", ascending=False)
        feat_imp.to_csv(os.path.join(EVAL, "feature_importance.csv"), index=False)
        print("\nTop 10 features:")
        print(feat_imp.head(10).to_string(index=False))

    with open(os.path.join(MODELS, "best_model.txt"), "w") as f:
        f.write(best)

    print(f"\n[OK] Models saved to {MODELS}")
    print(f"[OK] Evaluation saved to {EVAL}")


if __name__ == "__main__":
    main()