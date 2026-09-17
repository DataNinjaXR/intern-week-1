"""Exploratory Data Analysis for hygiene risk."""
import os
import pandas as pd
import matplotlib.pyplot as plt

# --- Paths anchored to this file (works from any cwd) ---
HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.abspath(os.path.join(HERE, "..", "dataset", "facility_risk.csv"))
OUT = HERE

plt.rcParams.update({"figure.dpi": 100, "axes.grid": True, "grid.alpha": 0.3})


def main():
    if not os.path.exists(RAW):
        print(f"[ERROR] Missing: {RAW}")
        print("Run: python ../dataset/generate_data.py")
        return

    df = pd.read_csv(RAW)
    print(f"Loaded: {df.shape}")

    numeric = ["cleanliness_score", "odor_score", "waste_level",
               "complaints", "footfall", "hours_since_cleaning"]
    for c in numeric:
        df[c] = pd.to_numeric(df[c], errors="coerce")

    # 1. Class balance
    plt.figure(figsize=(6, 4))
    df["hygiene_risk"].value_counts().plot(
        kind="bar", color=["#2ecc71", "#f39c12", "#e74c3c"], edgecolor="black"
    )
    plt.title("Hygiene Risk Class Distribution")
    plt.ylabel("Count")
    plt.xticks(rotation=0)
    plt.tight_layout()
    plt.savefig(os.path.join(OUT, "eda_01_class_balance.png"), bbox_inches="tight")
    plt.close()

    # 2. Feature distributions by risk
    fig, axes = plt.subplots(2, 3, figsize=(14, 8))
    for ax, col in zip(axes.flat, numeric):
        for label in ["Low", "Medium", "High"]:
            subset = df[df["hygiene_risk"] == label][col].dropna()
            ax.hist(subset, bins=20, alpha=0.5, label=label)
        ax.set_title(col)
        ax.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(OUT, "eda_02_feature_distributions.png"),
                bbox_inches="tight")
    plt.close()

    # 3. Correlation heatmap (matplotlib only)
    corr = df[numeric].corr()
    fig, ax = plt.subplots(figsize=(7, 6))
    im = ax.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
    ax.set_xticks(range(len(corr)))
    ax.set_yticks(range(len(corr)))
    ax.set_xticklabels(corr.columns, rotation=45, ha="right")
    ax.set_yticklabels(corr.columns)
    for i in range(len(corr)):
        for j in range(len(corr)):
            ax.text(j, i, f"{corr.iloc[i, j]:.2f}",
                    ha="center", va="center", color="black", fontsize=8)
    plt.colorbar(im)
    plt.title("Correlation Matrix")
    plt.tight_layout()
    plt.savefig(os.path.join(OUT, "eda_03_correlation.png"), bbox_inches="tight")
    plt.close()

    print(f"[OK] EDA plots saved to {OUT}")


if __name__ == "__main__":
    main()