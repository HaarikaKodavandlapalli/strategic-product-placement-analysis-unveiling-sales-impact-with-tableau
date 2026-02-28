"""
Data Preparation Script
Cleans raw sales data and creates processed data
"""

import pandas as pd
import numpy as np

# Load raw data
raw_data = pd.read_csv('raw_sales_data.csv')

# Data cleaning and transformation
raw_data['Date'] = pd.to_datetime(raw_data['Date'])
raw_data['CostPerUnit'] = pd.to_numeric(raw_data['CostPerUnit'])
raw_data['PromotionActive'] = raw_data['PromotionActive'].map({'True': True, 'False': False})

# Calculate metrics
raw_data['GrossProfit'] = (raw_data['Revenue'] - (raw_data['UnitsSold'] * raw_data['CostPerUnit']))
raw_data['ProfitMargin'] = (raw_data['GrossProfit'] / raw_data['Revenue'] * 100)
raw_data['SalesPerVisitor'] = raw_data['Revenue'] / raw_data['VisitorCount']
raw_data['PlacementEffectiveness'] = raw_data['UnitsSold'] / raw_data['VisitorCount']
raw_data['PromotionImpact'] = 1 + raw_data['PromotionDiscount']

# Select columns for processed data
processed_data = raw_data[['ProductID', 'ProductName', 'Category', 'PlacementLocation', 
                            'RegionID', 'Date', 'UnitsSold', 'Revenue', 'GrossProfit', 
                            'ProfitMargin', 'SalesPerVisitor', 'PlacementEffectiveness', 'PromotionImpact']]

# Save processed data
processed_data.to_csv('processed_data.csv', index=False)
print("Data preparation completed successfully!")
print(f"Processed {len(processed_data)} records")