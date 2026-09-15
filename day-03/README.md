# Day 3 - Facility Dataset Analysis

## Objective

The objective of Day 3 was to clean and analyze a facility dataset, identify data-quality issues, calculate statistics, generate visualizations, and find useful operational insights.

## Dataset

The dataset contains the following fields:

- `facility_id`
- `location`
- `facility_type`
- `cleanliness_score`
- `odor_score`
- `waste_level`
- `water_availability`
- `footfall`
- `complaints`
- `inspection_date`

The dataset generator created 500 facility records and intentionally added missing values, duplicate records, invalid values, and outliers for practice.

## Data Cleaning

The cleaning script was developed using Pandas and NumPy.

The following operations were performed:

1. Loaded the original CSV file.
2. Checked missing values in each column.
3. Detected duplicate rows and duplicate facility IDs.
4. Converted numeric columns into numeric data types.
5. Identified invalid values using predefined valid ranges.
6. Replaced invalid values with missing values.
7. Filled missing numeric values using the median.
8. Detected outliers using the IQR method.
9. Converted the inspection date into datetime format.
10. Saved the cleaned dataset as `facility_data_clean.csv`.

A separate `cleaning_report.txt` file was created to record the detected problems and cleaning operations.

## Statistical Analysis

The analysis script calculates:

- Total number of records
- Mean
- Minimum value
- Maximum value
- Standard deviation
- Quartiles
- Location-wise statistics
- Facility-type statistics
- Water-availability statistics
- Correlation between numerical columns

The analysis also identifies the best and worst locations based on cleanliness score and the facility type with the highest number of complaints.

## Visualizations

Five visualizations were created:

1. **Bar Chart:** Average cleanliness score by location.
2. **Bar Chart:** Total complaints by facility type.
3. **Histogram:** Distribution of footfall.
4. **Scatter Plot:** Relationship between cleanliness score and odor score.
5. **Box Plot:** Waste-level distribution by location.

These charts help compare locations, understand complaint patterns, observe footfall distribution, identify relationships, and detect variation in waste levels.

## Key Findings

### Finding 1: Location Performance

The average cleanliness score differs between locations. Locations with lower cleanliness scores require more cleaning resources, frequent inspections, and better maintenance planning.

### Finding 2: Complaint Concentration

Some facility types receive more complaints than others. These facility types should be investigated to identify common problems related to cleanliness, waste management, odor, or maintenance.

### Finding 3: Water Availability

Facilities with water availability can be compared with facilities without water availability. This comparison helps understand whether water access is associated with better cleanliness scores.

### Finding 4: Cleanliness and Odor

The scatter plot and correlation matrix show the relationship between cleanliness and odor scores. This helps determine whether cleanliness problems are connected with odor-related complaints.

### Finding 5: Footfall and Complaints

Facilities with higher footfall may require more frequent cleaning and maintenance. Comparing footfall with complaints can help management plan staff allocation and cleaning schedules.

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- CSV files
- Data cleaning
- Descriptive statistics
- Data visualization

## How to Run

### Generate the Dataset

```bash
cd dataset
python generate_data.py