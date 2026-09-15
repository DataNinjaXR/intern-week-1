"""Generates a realistic facility dataset with intentional problems."""
import csv
import random
from datetime import datetime, timedelta

random.seed(42)

LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune"]
FACILITY_TYPES = ["Public Toilet", "Bus Stand", "Railway Station",
                  "Market", "Park", "Hospital"]


def generate(n=500):
    rows = []
    start = datetime(2024, 1, 1)

    for i in range(1, n + 1):
        fid = f"FAC{i:04d}"
        loc = random.choice(LOCATIONS)
        ftype = random.choice(FACILITY_TYPES)

        cleanliness = round(random.gauss(6.5, 1.8), 1)
        odor = round(random.gauss(5.5, 2.0), 1)
        waste = round(random.gauss(4.5, 2.2), 1)
        water = random.choice(["Yes", "Yes", "Yes", "No", "Partial"])
        footfall = max(0, int(random.gauss(300, 150)))
        complaints = max(0, int(random.gauss(4, 3)))

        # Inject outliers (~2%)
        if random.random() < 0.02:
            footfall = random.choice([2500, 3000, -50])
        if random.random() < 0.02:
            cleanliness = random.choice([-2, 15, 11])

        # Inject missing values (~5%)
        if random.random() < 0.05:
            cleanliness = ""
        if random.random() < 0.04:
            odor = ""
        if random.random() < 0.03:
            complaints = ""

        # Inject invalid water value (~1%)
        if random.random() < 0.01:
            water = "Maybe"

        date = start + timedelta(days=random.randint(0, 365))
        rows.append({
            "facility_id": fid,
            "location": loc,
            "facility_type": ftype,
            "cleanliness_score": cleanliness,
            "odor_score": odor,
            "waste_level": waste,
            "water_availability": water,
            "footfall": footfall,
            "complaints": complaints,
            "inspection_date": date.strftime("%Y-%m-%d"),
        })

    # Inject duplicates (~2%)
    for _ in range(int(n * 0.02)):
        rows.append(random.choice(rows).copy())

    random.shuffle(rows)
    return rows


if __name__ == "__main__":
    data = generate(500)
    with open("facility_data.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    print(f"✅ Created facility_data.csv with {len(data)} rows")