"""Generate evaluation plots: comparison, feature importance, confusion matrices."""
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import label_binarize
from sklearn.metrics import roc_curve, auc
import joblib

HERE = os.path.dirname(os.path.abspath(__file__))
PREP = os.path.abspath(os.path.join(HERE, "..", "preprocessing"))
MODELS = os.path.abspath(os.path.join(HERE, "..", "models"))
EVAL = HERE

plt.rcParams.update({"figure.dpi": 100, "axes.grid": True, "grid.alpha": 0.3})


def main():
    X_test  = pd.read_csv(os.path.join(PREP, "X_test.csv"))
    X_test_s= pd.read_csv(os.path.join(PREP, "X_test_scaled.csv"))
    y_test  = pd.read_csv(os.path.join(PREP, "y_test.csv")).squeeze()

    lr = joblib.load(os.path.join(MODELS, "logistic_regression.joblib"))
    rf = joblib.load(os.path.join(MODELS, "random_forest.joblib"))

    # 1. Model comparison
    comp = pd.read_csv(os.path.join(EVAL, "model_comparison.csv")).set_index("model")
    comp.plot(kind="bar", figsize=(9, 5), edgecolor="black")
    plt.title("Model Comparison - Weighted Metrics")
    plt.ylabel("Score")
    plt.ylim(0, 1.05)
    plt.xticks(rotation=0)
    plt.legend(loc="lower right")
    plt.tight_layout()
    plt.savefig(os.path.join(EVAL, "eval_01_model_comparison.png"), bbox_inches="tight")
    plt.close()

    # 2. Confusion matrices side by side
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    for ax, (name, model, X) in zip(
        axes,
        [("Logistic Regression", lr, X_test_s),
         ("Random Forest", rf, X_test)]
    ):
        cm_file = os.path.join(EVAL, f"cm_{name.replace(' ', '_').lower()}.csv")
        cm = pd.read_csv(cm_file, index_col=0)
        ax.imshow(cm.values, cmap="Blues")
        ax.set_xticks(range(len(cm.columns)))
        ax.set_yticks(range(len(cm.index)))
        ax.set_xticklabels(cm.columns)
        ax.set_yticklabels(cm.index)
        for i in range(len(cm)):
            for j in range(len(cm.columns)):
                ax.text(j, i, cm.values[i, j], ha="center", va="center",
                        color="black" if cm.values[i, j] < cm.values.max()/2 else "white")
        ax.set_title(name)
        ax.set_xlabel("Predicted")
        ax.set_ylabel("Actual")
    plt.tight_layout()
    plt.savefig(os.path.join(EVAL, "eval_02_confusion_matrices.png"), bbox_inches="tight")
    plt.close()

    # 3. Feature importance
    fi_path = os.path.join(EVAL, "feature_importance.csv")
    if os.path.exists(fi_path):
        fi = pd.read_csv(fi_path).head(12).iloc[::-1]
        plt.figure(figsize=(9, 6))
        plt.barh(fi["feature"], fi["importance"], color="teal", edgecolor="black")
        plt.title("Random Forest - Top 12 Feature Importances")
        plt.xlabel("Importance")
        plt.tight_layout()
        plt.savefig(os.path.join(EVAL, "eval_03_feature_importance.png"),
                    bbox_inches="tight")
        plt.close()

    # 4. ROC curves (OvR macro)
    classes = sorted(y_test.unique())
    y_bin = label_binarize(y_test, classes=classes)

    plt.figure(figsize=(7, 6))
    for name, model, X in [("Logistic Regression", lr, X_test_s),
                           ("Random Forest", rf, X_test)]:
        y_prob = model.predict_proba(X)
        fpr, tpr, _ = roc_curve(y_bin.ravel(), y_prob.ravel())
        roc_auc = auc(fpr, tpr)
        plt.plot(fpr, tpr, label=f"{name} (macro AUC={roc_auc:.3f})", linewidth=2)
    plt.plot([0, 1], [0, 1], "k--", linewidth=1)
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curves (One-vs-Rest, macro)")
    plt.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(EVAL, "eval_04_roc_curves.png"), bbox_inches="tight")
    plt.close()

    print(f"[OK] Evaluation plots saved to {EVAL}")


if __name__ == "__main__":
    main()