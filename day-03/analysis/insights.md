# Facility Data — Analysis Report

_Generated from 500 cleaned records._

## 1. Descriptive Statistics

```
       cleanliness_score  odor_score  waste_level  footfall  complaints
count             500.00      500.00       500.00    500.00      500.00
mean                6.46        5.43         4.61    311.75        3.82
std                 1.49        1.90         2.01    144.80        2.65
min                 2.50        0.45        -0.00      0.00        0.00
25%                 5.50        4.20         3.00    221.75        2.00
50%                 6.50        5.50         4.50    302.00        4.00
75%                 7.50        6.70         6.00    403.25        6.00
max                10.00        9.80         9.90    675.50       11.00
```

## 2. Category-wise Statistics

### By Location
```
           facilities  avg_cleanliness  avg_odor  avg_waste  avg_footfall  total_complaints
location                                                                                   
Pune               79             6.20      5.71       4.46        310.61             293.0
Kolkata            89             6.31      5.19       4.50        328.96             318.0
Chennai            82             6.43      5.41       4.66        290.40             351.0
Bangalore          79             6.53      5.43       4.78        325.65             337.0
Mumbai             87             6.55      5.31       4.40        313.12             293.0
Delhi              84             6.75      5.53       4.85        300.95             316.0
```

### By Facility Type
```
                 count  avg_cleanliness  total_complaints
facility_type                                            
Park                91             6.44             346.0
Hospital            90             6.40             333.0
Market              88             6.39             330.0
Public Toilet       75             6.61             314.0
Railway Station     80             6.66             303.0
Bus Stand           76             6.31             282.0
```

### By Water Availability
```
                    count  avg_cleanliness  avg_waste
water_availability                                   
No                    117             6.66       4.49
Partial                80             6.45       4.80
Unknown                 7             6.33       3.03
Yes                   296             6.39       4.64
```

## 3. Correlation Matrix
```
                   cleanliness_score  odor_score  waste_level  footfall  complaints
cleanliness_score               1.00       -0.04        -0.09     -0.07        0.00
odor_score                     -0.04        1.00        -0.09     -0.03       -0.00
waste_level                    -0.09       -0.09         1.00      0.03       -0.04
footfall                       -0.07       -0.03         0.03      1.00        0.00
complaints                      0.00       -0.00        -0.04      0.00        1.00
```

## 4. Key Insights

### Insight 1 - Location Performance Gap
- Best: **Delhi** -> avg cleanliness **6.75**
- Worst: **Pune** -> avg cleanliness **6.2**
- **Action:** Redirect cleaning crew & budget to **Pune**.

### Insight 2 - Facility Type Drives Complaints
- Highest complaints: **Park** (346 total)
- Lowest complaints: **Bus Stand** (282 total)
- **Action:** Root-cause review of **Park** facilities.

### Insight 3 - Water Availability vs Cleanliness
- With water: **6.39** avg cleanliness
- Without water: **6.66** avg cleanliness
- Gap = **-0.27 points**

### Insight 4 - Cleanliness vs Odor
- Correlation: **-0.04**
- Near-zero in this dataset — likely because outliers were capped;
  check scatter plot for visual pattern.

### Insight 5 - Footfall vs Complaints
- Correlation: **0.0**
- Weak relationship in this sample.
