import json
import os

DATA_FILE = "records.json"

# ---------- STORAGE ----------
def load_records():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        print("⚠️  Could not read file. Starting fresh.")
        return []

def save_records(records):
    try:
        with open(DATA_FILE, 'w') as f:
            json.dump(records, f, indent=2)
    except IOError as e:
        print(f"❌ Save failed: {e}")

# ---------- HELPERS ----------
def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("❌ Please enter a valid number.")

def get_float(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("❌ Please enter a valid decimal number.")

def find_by_id(records, rid):
    for r in records:
        if r["id"] == rid:
            return r
    return None

# ---------- CRUD ----------
def add_record(records):
    rid = get_int("Enter ID: ")
    if find_by_id(records, rid):
        print("❌ ID already exists.")
        return
    name = input("Enter Name: ").strip()
    if not name:
        print("❌ Name cannot be empty.")
        return
    dept = input("Enter Department: ").strip()
    salary = get_float("Enter Salary: ")
    
    records.append({"id": rid, "name": name, "dept": dept, "salary": salary})
    save_records(records)
    print("✅ Record added.")

def update_record(records):
    rid = get_int("Enter ID to update: ")
    rec = find_by_id(records, rid)
    if not rec:
        print("❌ Record not found.")
        return
    
    print(f"Current: {rec}")
    name = input(f"New name [{rec['name']}]: ").strip()
    dept = input(f"New department [{rec['dept']}]: ").strip()
    sal_input = input(f"New salary [{rec['salary']}]: ").strip()
    
    if name: rec['name'] = name
    if dept: rec['dept'] = dept
    if sal_input:
        try:
            rec['salary'] = float(sal_input)
        except ValueError:
            print("⚠️  Invalid salary, keeping old value.")
    
    save_records(records)
    print("✅ Record updated.")

def delete_record(records):
    rid = get_int("Enter ID to delete: ")
    rec = find_by_id(records, rid)
    if not rec:
        print("❌ Record not found.")
        return
    records.remove(rec)
    save_records(records)
    print("✅ Record deleted.")

def search_records(records):
    term = input("Search (name/dept): ").strip().lower()
    results = [r for r in records
               if term in r['name'].lower() or term in r['dept'].lower()]
    show(results)

def filter_records(records):
    print("Filter by:")
    print("  1. Department")
    print("  2. Salary greater than X")
    print("  3. Salary less than X")
    choice = input("Choose: ").strip()
    
    if choice == "1":
        dept = input("Department: ").strip().lower()
        results = [r for r in records if r['dept'].lower() == dept]
    elif choice == "2":
        x = get_float("Salary > ")
        results = [r for r in records if r['salary'] > x]
    elif choice == "3":
        x = get_float("Salary < ")
        results = [r for r in records if r['salary'] < x]
    else:
        print("Invalid choice.")
        return
    show(results)

def sort_records(records):
    print("Sort by:")
    print("  1. Name")
    print("  2. Salary")
    print("  3. Department")
    choice = input("Choose: ").strip()
    
    if choice == "1":
        results = sorted(records, key=lambda r: r['name'])
    elif choice == "2":
        results = sorted(records, key=lambda r: r['salary'])
    elif choice == "3":
        results = sorted(records, key=lambda r: r['dept'])
    else:
        print("Invalid choice.")
        return
    show(results)

def show_statistics(records):
    if not records:
        print("No records.")
        return
    
    salaries = [r['salary'] for r in records]
    depts = {}
    for r in records:
        depts.setdefault(r['dept'], []).append(r['salary'])
    
    print(f"\n{'='*50}")
    print(f"Total records: {len(records)}")
    print(f"Average salary: {sum(salaries)/len(salaries):.2f}")
    print(f"Min salary: {min(salaries)}")
    print(f"Max salary: {max(salaries)}")
    print(f"\nDepartment-wise stats:")
    for d, sals in depts.items():
        print(f"  {d}: count={len(sals)}, avg={sum(sals)/len(sals):.2f}")
    print(f"{'='*50}")

def show(records):
    if not records:
        print("(no results)")
        return
    print(f"\n{'ID':<5} {'Name':<15} {'Dept':<12} {'Salary':<10}")
    print("-" * 45)
    for r in records:
        print(f"{r['id']:<5} {r['name']:<15} {r['dept']:<12} {r['salary']:<10}")

# ---------- MENU ----------
def menu():
    records = load_records()
    options = {
        "1": ("Add record", add_record),
        "2": ("Update record", update_record),
        "3": ("Delete record", delete_record),
        "4": ("Search", search_records),
        "5": ("Filter", filter_records),
        "6": ("Sort", sort_records),
        "7": ("Statistics", show_statistics),
        "8": ("Show all", lambda r: show(r)),
    }
    
    while True:
        print("\n===== STUDENT/EMPLOYEE MANAGEMENT =====")
        for k, (label, _) in options.items():
            print(f"  {k}. {label}")
        print("  0. Exit")
        
        choice = input("Choose: ").strip()
        
        if choice == "0":
            print("👋 Goodbye!")
            break
        
        if choice in options:
            try:
                options[choice][1](records)
            except Exception as e:
                print(f"❌ Unexpected error: {e}")
        else:
            print("❌ Invalid option.")

if __name__ == "__main__":
    menu()