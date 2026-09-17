"""Generate facility dataset with a hygiene risk target."""
import csv
import os
import random
from datetime import datetime, timedelta

random.seed(42)

# --- Save next to this script, no matter where python is invoked from ---
HERE = os.path.dirname(os.path.abspath(__file__))
OUT_FILE = os.path.join(HERE, "facility_risk.csv")

LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune"]
FACILITY_TYPES = ["Public Toilet", "Bus Stand", "Railway Station",
                  "Market", "Park", "Hospital"]


def risk_from_features(clean, odor, waste, complaints, footfall, hours):
    """Rule-based ground truth. Higher score = riskier."""
    score = 0.0
    score += max(0, 7 - clean) * 2
    score += max(0, odor - 4) * 1.5
    score += max(0, waste - 4) * 1.5
    score += min(complaints, 15) * 0.4
    score += min(footfall / 100, 10) * 0.3
    score += min(hours / 12, 4) * 0.8

    if score < 8:
        return "Low"
    elif score < 14:
        return "Medium"
    else:
        return "High"


def generate(n=1500):
    rows = []
    start = datetime(2024, 1, 1)

    for i in range(1, n + 1):
        clean = round(max(0, min(10, random.gauss(6.3, 1.9))), 1)
        odor = round(max(0, min(10, random.gauss(5.4, 2.0))), 1)
        waste = round(max(0, min(10, random.gauss(4.6, 2.1))), 1)
        complaints = max(0, int(random.gauss(4, 3)))
        footfall = max(0, int(random.gauss(320, 160)))
        hours = round(max(0, random.gauss(14, 8)), 1)

        # Label BEFORE injecting missing values
        label = risk_from_features(clean, odor, waste, complaints, footfall, hours)
        if random.random() < 0.08:
            label = random.choice(["Low", "Medium", "High"])

        # NOW inject missing
        if random.random() < 0.03:
            odor = ""
        if random.random() < 0.02:
            hours = ""

        date = start + timedelta(days=random.randint(0, 365))
        rows.append({
            "facility_id": f"FAC{i:05d}",
            "location": random.choice(LOCATIONS),
            "facility_type": random.choice(FACILITY_TYPES),
            "cleanliness_score": clean,
            "odor_score": odor,
            "waste_level": waste,
            "complaints": complaints,
            "footfall": footfall,
            "hours_since_cleaning": hours,
            "inspection_date": date.strftime("%Y-%m-%d"),
            "hygiene_risk": label,
        })

    random.shuffle(rows)
    return rows


if __name__ == "__main__":
    data = generate(1500)
    with open(OUT_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    print(f"[OK] Created: {OUT_FILE}")
    print(f"[OK] Rows: {len(data)}")