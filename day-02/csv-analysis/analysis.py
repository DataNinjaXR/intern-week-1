import csv
import json
import os
from statistics import mean

def load_data(filename):
    """Load data from CSV or JSON based on extension."""
    if not os.path.exists(filename):
        raise FileNotFoundError(f"File not found: {filename}")
    
    ext = filename.lower().split('.')[-1]
    
    if ext == 'csv':
        with open(filename, 'r') as f:
            return list(csv.DictReader(f))
    elif ext == 'json':
        with open(filename, 'r') as f:
            return json.load(f)
    else:
        raise ValueError("Only .csv or .json supported")

def is_number(value):
    """Check if a value can be treated as a number."""
    try:
        float(value)
        return True
    except (ValueError, TypeError):
        return False

def analyze(records):
    if not records:
        print("No records to analyze.")
        return
    
    total = len(records)
    columns = list(records[0].keys())
    
    print(f"\n{'='*60}")
    print(f"📊 TOTAL RECORDS: {total}")
    print(f"📋 COLUMNS: {columns}")
    print(f"{'='*60}")
    
    # Duplicates
    seen = []
    duplicates = 0
    for r in records:
        key = tuple(sorted(r.items()))
        if key in seen:
            duplicates += 1
        else:
            seen.append(key)
    print(f"\n🔁 Duplicate records: {duplicates}")
    
    # Per-column stats
    print(f"\n{'─'*60}")
    print("COLUMN-WISE STATISTICS")
    print(f"{'─'*60}")
    
    for col in columns:
        values = [r[col] for r in records]
        missing = sum(1 for v in values if v in ('', None, 'NA', 'N/A'))
        numeric = [float(v) for v in values if is_number(v)]
        
        print(f"\n▸ Column: '{col}'")
        print(f"  • Missing values: {missing} ({missing/total*100:.1f}%)")
        
        if numeric:
            print(f"  • Count (numeric): {len(numeric)}")
            print(f"  • Average: {mean(numeric):.2f}")
            print(f"  • Min: {min(numeric)}")
            print(f"  • Max: {max(numeric)}")
        else:
            # Category-wise stats
            from collections import Counter
            counts = Counter(values)
            print(f"  • Unique values: {len(counts)}")
            print(f"  • Category-wise counts:")
            for cat, cnt in counts.most_common(5):
                print(f"      - {cat}: {cnt}")

# ---- Main ----
if __name__ == "__main__":
    # Create sample data
    sample = [
        {"id": "1", "name": "Alice", "dept": "IT", "salary": "50000"},
        {"id": "2", "name": "Bob", "dept": "HR", "salary": "45000"},
        {"id": "3", "name": "Carol", "dept": "IT", "salary": "60000"},
        {"id": "4", "name": "", "dept": "HR", "salary": "48000"},
        {"id": "5", "name": "Eve", "dept": "Finance", "salary": "55000"},
        {"id": "1", "name": "Alice", "dept": "IT", "salary": "50000"},
    ]
    
    # Save as JSON sample
    with open("sample.json", "w") as f:
        json.dump(sample, f, indent=2)
    
    # Save as CSV sample
    with open("sample.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "name", "dept", "salary"])
        writer.writeheader()
        writer.writerows(sample)
    
    print("Choose file to analyze:")
    print("1. sample.csv")
    print("2. sample.json")
    choice = input("Enter 1 or 2: ").strip()
    
    try:
        filename = "sample.csv" if choice == "1" else "sample.json"
        data = load_data(filename)
        analyze(data)
    except Exception as e:
        print(f"❌ Error: {e}")