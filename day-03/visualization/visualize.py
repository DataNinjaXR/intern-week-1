"""All charts using pure Matplotlib (no Seaborn)."""
import pandas as pd
import matplotlib.pyplot as plt
import os

CLEAN = "../dataset/facility_data_clean.csv"
OUT_DIR = "."

plt.rcParams.update({
    "figure.dpi": 100,
    "axes.grid": True,
    "grid.alpha": 0.3,
    "axes.edgecolor": "black",
    "font.size": 11,
})


def save(fig_name):
    path = os.path.join(OUT_DIR, fig_name)
    plt.tight_layout()
    plt.savefig(path, bbox_inches="tight")
    plt.close()
    print(f"[OK] Saved {path}")


def main():
    if not os.path.exists(CLEAN):
        print(f"[ERROR] Missing {CLEAN}. Run clean_data.py first.")
        return

    df = pd.read_csv(CLEAN)

    # ---------- CHART 1: Bar - avg cleanliness by location ----------
    plt.figure(figsize=(9, 5))
    avg_clean = df.groupby("location")["cleanliness_score"].mean().sort_values()
    plt.bar(avg_clean.index, avg_clean.values,
            color="steelblue", edgecolor="black")
    plt.title("Average Cleanliness Score by Location")
    plt.ylabel("Cleanliness Score (0-10)")
    plt.xlabel("Location")
    plt.xticks(rotation=45)
    save("01_avg_cleanliness_by_location.png")

    # ---------- CHART 2: Horizontal Bar - complaints by facility type ----------
    plt.figure(figsize=(9, 5))
    complaints = df.groupby("facility_type")["complaints"].sum().sort_values()
    plt.barh(complaints.index, complaints.values,
             color="tomato", edgecolor="black")
    plt.title("Total Complaints by Facility Type")
    plt.xlabel("Number of Complaints")
    plt.ylabel("Facility Type")
    save("02_complaints_by_type.png")

    # ---------- CHART 3: Histogram - footfall distribution ----------
    plt.figure(figsize=(9, 5))
    plt.hist(df["footfall"], bins=30, color="seagreen", edgecolor="black")
    plt.title("Distribution of Footfall Across Facilities")
    plt.xlabel("Daily Footfall")
    plt.ylabel("Number of Facilities")
    save("03_footfall_histogram.png")

    # ---------- CHART 4: Scatter - cleanliness vs odor ----------
    plt.figure(figsize=(9, 5))
    palette = {"Yes": "tab:green", "No": "tab:red",
               "Partial": "tab:orange", "Unknown": "tab:gray"}
    for water, group in df.groupby("water_availability"):
        plt.scatter(group["cleanliness_score"], group["odor_score"],
                    label=water, alpha=0.7,
                    color=palette.get(water, "tab:blue"),
                    edgecolor="black", linewidth=0.3)
    plt.title("Cleanliness vs Odor (colored by water availability)")
    plt.xlabel("Cleanliness Score")
    plt.ylabel("Odor Score")
    plt.legend(title="Water")
    save("04_cleanliness_vs_odor.png")

    # ---------- CHART 5: Box plot - waste by location ----------
    plt.figure(figsize=(10, 5))
    locations = sorted(df["location"].unique())
    data = [df.loc[df["location"] == loc, "waste_level"].values for loc in locations]
    box = plt.boxplot(data, tick_labels=locations, patch_artist=True,
                      medianprops=dict(color="black", linewidth=2))
    colors = plt.cm.Set2.colors
    for patch, color in zip(box["boxes"], colors * 3):
        patch.set_facecolor(color)
        patch.set_edgecolor("black")
    plt.title("Waste Level Distribution by Location")
    plt.xlabel("Location")
    plt.ylabel("Waste Level (0-10)")
    plt.xticks(rotation=45)
    save("05_waste_by_location.png")

    print("\n[DONE] All 5 visualizations generated (pure Matplotlib).")


if __name__ == "__main__":
    main()