"""
Data Analysis Script
Analyzes processed data and generates insights
"""

import pandas as pd
import json

# Load processed data
processed_data = pd.read_csv('processed_data.csv')

# Analysis 1: Revenue by Region
revenue_by_region = processed_data.groupby('RegionID')['Revenue'].sum().to_dict()

# Analysis 2: Revenue by Placement
revenue_by_placement = processed_data.groupby('PlacementLocation')['Revenue'].sum().to_dict()

# Analysis 3: Revenue by Category
revenue_by_category = processed_data.groupby('Category')['Revenue'].sum().to_dict()

# Analysis 4: Top Products
top_products = processed_data.nlargest(5, 'Revenue')[['ProductName', 'Revenue']].to_dict('records')

# Analysis 5: Placement Effectiveness
placement_effectiveness = processed_data.groupby('PlacementLocation')['PlacementEffectiveness'].mean().to_dict()

# Create summary
analysis_summary = {
    'total_revenue': float(processed_data['Revenue'].sum()),
    'total_transactions': len(processed_data),
    'avg_units_sold': float(processed_data['UnitsSold'].mean()),
    'categories_count': processed_data['Category'].nunique(),
    'revenue_by_region': revenue_by_region,
    'revenue_by_placement': revenue_by_placement,
    'revenue_by_category': revenue_by_category,
    'top_products': top_products,
    'placement_effectiveness': placement_effectiveness
}

# Save analysis results
with open('analysis_results.json', 'w') as f:
    json.dump(analysis_summary, f, indent=2)

print("Analysis completed successfully!")
print(json.dumps(analysis_summary, indent=2))