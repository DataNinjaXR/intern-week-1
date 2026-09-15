"""Pure statistical analysis — no plotting. Outputs insights.md."""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

import pandas as pd
import numpy as np
import os

CLEAN = "../dataset/facility_data_clean.csv"
REPORT = "insights.md"

NUMERIC_COLS = ["cleanliness_score", "odor_score", "waste_level",
                "footfall", "complaints"]


def section(title):
    bar = "=" * 60
    print(f"\n{bar}\n{title}\n{bar}")


def main():
    if not os.path.exists(CLEAN):
        print(f"[ERROR] Missing {CLEAN}. Run clean_data.py first.")
        return

    df = pd.read_csv(CLEAN)
    df["inspection_date"] = pd.to_datetime(df["inspection_date"], errors="coerce")

    insights = ["# Facility Data — Analysis Report\n",
                f"_Generated from {len(df)} cleaned records._\n"]

    # ---------- 1. DESCRIPTIVE STATS ----------
    section("DESCRIPTIVE STATISTICS")
    desc = df[NUMERIC_COLS].describe().round(2)
    print(desc)
    insights.append("## 1. Descriptive Statistics\n")
    insights.append("```\n" + desc.to_string() + "\n```\n")

    # ---------- 2. CATEGORY STATS ----------
    section("CATEGORY-WISE STATISTICS")
    insights.append("## 2. Category-wise Statistics\n")

    by_loc = df.groupby("location").agg(
        facilities=("facility_id", "count"),
        avg_cleanliness=("cleanliness_score", "mean"),
        avg_odor=("odor_score", "mean"),
        avg_waste=("waste_level", "mean"),
        avg_footfall=("footfall", "mean"),
        total_complaints=("complaints", "sum"),
    ).round(2).sort_values("avg_cleanliness")
    print("\nBy Location:\n", by_loc)
    insights.append("### By Location\n```\n" + by_loc.to_string() + "\n```\n")

    by_type = df.groupby("facility_type").agg(
        count=("facility_id", "count"),
        avg_cleanliness=("cleanliness_score", "mean"),
        total_complaints=("complaints", "sum"),
    ).round(2).sort_values("total_complaints", ascending=False)
    print("\nBy Facility Type:\n", by_type)
    insights.append("### By Facility Type\n```\n" + by_type.to_string() + "\n```\n")

    by_water = df.groupby("water_availability").agg(
        count=("facility_id", "count"),
        avg_cleanliness=("cleanliness_score", "mean"),
        avg_waste=("waste_level", "mean"),
    ).round(2)
    print("\nBy Water Availability:\n", by_water)
    insights.append("### By Water Availability\n```\n" + by_water.to_string() + "\n```\n")

    # ---------- 3. CORRELATIONS ----------
    section("CORRELATION MATRIX")
    corr = df[NUMERIC_COLS].corr().round(2)
    print(corr)
    insights.append("## 3. Correlation Matrix\n```\n" + corr.to_string() + "\n```\n")

    # ---------- 4. RANKINGS ----------
    section("TOP / BOTTOM PERFORMERS")
    worst_loc = by_loc.index[0]
    best_loc = by_loc.index[-1]
    worst_type = by_type["total_complaints"].idxmax()
    best_type = by_type["total_complaints"].idxmin()

    print(f"Best location:  {best_loc} (cleanliness {by_loc.loc[best_loc, 'avg_cleanliness']})")
    print(f"Worst location: {worst_loc} (cleanliness {by_loc.loc[worst_loc, 'avg_cleanliness']})")
    print(f"Most complaints: {worst_type} ({by_type.loc[worst_type, 'total_complaints']})")

    # ---------- 5. KEY INSIGHTS ----------
    water_yes = df[df["water_availability"] == "Yes"]["cleanliness_score"].mean()
    water_no = df[df["water_availability"] == "No"]["cleanliness_score"].mean()
    clean_odor_corr = corr.loc["cleanliness_score", "odor_score"]
    foot_compl_corr = corr.loc["footfall", "complaints"]

    # ASCII-only arrows to be safe on any encoding
    insights.append(f"""## 4. Key Insights

### Insight 1 - Location Performance Gap
- Best: **{best_loc}** -> avg cleanliness **{by_loc.loc[best_loc, 'avg_cleanliness']}**
- Worst: **{worst_loc}** -> avg cleanliness **{by_loc.loc[worst_loc, 'avg_cleanliness']}**
- **Action:** Redirect cleaning crew & budget to **{worst_loc}**.

### Insight 2 - Facility Type Drives Complaints
- Highest complaints: **{worst_type}** ({int(by_type.loc[worst_type, 'total_complaints'])} total)
- Lowest complaints: **{best_type}** ({int(by_type.loc[best_type, 'total_complaints'])} total)
- **Action:** Root-cause review of **{worst_type}** facilities.

### Insight 3 - Water Availability vs Cleanliness
- With water: **{water_yes:.2f}** avg cleanliness
- Without water: **{water_no:.2f}** avg cleanliness
- Gap = **{water_yes - water_no:.2f} points**

### Insight 4 - Cleanliness vs Odor
- Correlation: **{clean_odor_corr}**
- Near-zero in this dataset — likely because outliers were capped;
  check scatter plot for visual pattern.

### Insight 5 - Footfall vs Complaints
- Correlation: **{foot_compl_corr}**
- Weak relationship in this sample.
""")

    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(insights))
    print(f"\n[OK] Insights saved to {REPORT}")


if __name__ == "__main__":
    main()