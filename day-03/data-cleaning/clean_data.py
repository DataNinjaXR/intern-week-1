"""Cleans facility dataset. Fixes invalid values, imputes missing,
caps outliers, drops duplicates, and saves a fully valid CSV."""
import sys
import io
import pandas as pd
import numpy as np
import os

# Force UTF-8 stdout on Windows to avoid cp1252 crashes on emojis
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

INPUT = "../dataset/facility_data.csv"
OUTPUT = "../dataset/facility_data_clean.csv"
REPORT = "cleaning_report.txt"

NUMERIC_COLS = ["cleanliness_score", "odor_score", "waste_level",
                "footfall", "complaints"]
VALID_RANGES = {
    "cleanliness_score": (0, 10),
    "odor_score": (0, 10),
    "waste_level": (0, 10),
    "footfall": (0, None),
    "complaints": (0, None),
}
VALID_WATER = {"Yes", "No", "Partial"}


def write_report(lines):
    # encoding="utf-8" is the critical fix for Windows
    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"[OK] Report saved to {REPORT}")


def main():
    report = ["=" * 60, "FACILITY DATA CLEANING REPORT", "=" * 60, ""]

    if not os.path.exists(INPUT):
        print(f"[ERROR] Missing {INPUT}. Run generate_data.py first.")
        return

    df = pd.read_csv(INPUT)
    report.append(f"Original shape: {df.shape}")
    report.append(f"Columns: {list(df.columns)}\n")

    # ---- 1. MISSING VALUES ----
    report.append("--- 1. MISSING VALUES (before) ---")
    for col, cnt in df.isnull().sum().items():
        if cnt > 0:
            report.append(f"  {col}: {cnt} ({cnt/len(df)*100:.1f}%)")
    report.append("")

    # ---- 2. DUPLICATES ----
    dup_count = df.duplicated().sum()
    dup_ids = df[df.duplicated(subset=["facility_id"], keep=False)].shape[0]
    report.append("--- 2. DUPLICATES ---")
    report.append(f"  Full-row duplicates removed: {dup_count}")
    report.append(f"  Rows with duplicate facility_id (kept first): {dup_ids}\n")
    df = df.drop_duplicates().drop_duplicates(subset=["facility_id"], keep="first")
    df = df.reset_index(drop=True)
    report.append(f"  Shape after dedup: {df.shape}\n")

    # ---- 3. INVALID VALUES -> FIX ----
    report.append("--- 3. INVALID VALUES -> FIXED ---")
    for col, (lo, hi) in VALID_RANGES.items():
        if col not in df.columns:
            continue
        df[col] = pd.to_numeric(df[col], errors="coerce")
        fixed = 0
        if lo is not None:
            bad = df[col] < lo
            fixed += int(bad.sum())
            df.loc[bad, col] = np.nan
        if hi is not None:
            bad = df[col] > hi
            fixed += int(bad.sum())
            df.loc[bad, col] = np.nan
        report.append(f"  {col}: {fixed} invalid -> NaN")

    bad_water = ~df["water_availability"].isin(VALID_WATER)
    report.append(f"  water_availability: {int(bad_water.sum())} invalid -> 'Unknown'")
    df.loc[bad_water, "water_availability"] = "Unknown"
    report.append("")

    # ---- 4. IMPUTE NaN ----
    report.append("--- 4. IMPUTATION (median for numeric) ---")
    for col in NUMERIC_COLS:
        if col in df.columns:
            n = int(df[col].isnull().sum())
            med = df[col].median()
            df[col] = df[col].fillna(med)
            report.append(f"  {col}: {n} NaN -> {med:.2f}")
    report.append("")

    # ---- 5. OUTLIERS -> CAP ----
    report.append("--- 5. OUTLIERS -> CAPPED (1.5 x IQR winsorize) ---")
    for col in NUMERIC_COLS:
        Q1, Q3 = df[col].quantile([0.25, 0.75])
        IQR = Q3 - Q1
        lo, hi = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR
        below = int((df[col] < lo).sum())
        above = int((df[col] > hi).sum())
        df[col] = df[col].clip(lo, hi)
        report.append(
            f"  {col}: capped {below} low + {above} high (bounds {lo:.2f}..{hi:.2f})"
        )
    report.append("")

    # ---- 6. TYPE CLEANUP ----
    df["inspection_date"] = pd.to_datetime(df["inspection_date"], errors="coerce")
    df = df.sort_values("facility_id").reset_index(drop=True)

    for col in ["cleanliness_score", "odor_score", "waste_level"]:
        df[col] = df[col].round(2)

    # ---- 7. VALIDATE ----
    report.append("--- 6. POST-CLEAN VALIDATION ---")
    report.append(f"  Remaining missing values: {int(df.isnull().sum().sum())}")
    report.append(f"  Remaining duplicates: {int(df.duplicated().sum())}")
    in_range = True
    for col, (lo, hi) in VALID_RANGES.items():
        if lo is not None and (df[col] < lo).any():
            in_range = False
        if hi is not None and (df[col] > hi).any():
            in_range = False
    report.append(f"  All numeric values within valid ranges: {in_range}")
    report.append("")

    # ---- 8. SAVE ----
    df.to_csv(OUTPUT, index=False)
    report.append(f"Cleaned shape: {df.shape}")
    report.append("[OK] Saved to " + OUTPUT)
    write_report(report)
    print("\n".join(report))


if __name__ == "__main__":
    main()