Day 4 — Machine Learning
Objective
Understand basic Machine Learning concepts and build a model to predict facility hygiene risk.

Machine Learning Concepts
AI, ML and Deep Learning
Artificial Intelligence (AI) is a broad field where machines perform tasks that normally require human intelligence.
Machine Learning (ML) allows computers to learn patterns from data.
Deep Learning is a part of ML that uses neural networks with multiple layers.
Supervised Learning
The model learns from data that already has a known output or label.

Example: Predicting whether a facility has Low Risk or High Risk.

Unsupervised Learning
The model finds patterns in data without predefined labels.

Example: Grouping similar facilities using K-Means.

Classification
Classification predicts categories.

Example:

0 = Low Risk
1 = High Risk
Regression
Regression predicts numerical values.

Example:

Predicting the number of complaints.

Features and Labels
Features are the input values used by the model.

Features used in this project:

cleanliness_score
odor_score
waste_level
complaints
footfall
hours_since_cleaning
The label is:

hygiene_risk
Training, Validation and Testing
The dataset was divided into:

80% training data
20% testing data
The model learned patterns from the training data and was evaluated using the testing data.

Machine Learning Workflow
Dataset
   ↓
Data Cleaning
   ↓
EDA
   ↓
Feature Engineering
   ↓
Train/Test Split
   ↓
Model Training
   ↓
Prediction
   ↓
Evaluation