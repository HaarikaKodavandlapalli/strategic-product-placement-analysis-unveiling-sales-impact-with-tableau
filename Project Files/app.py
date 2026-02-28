"""
Flask Web Application
Serves the dashboard and API endpoints
"""

from flask import Flask, render_template, jsonify, request
import pandas as pd
import json
from datetime import datetime

app = Flask(__name__)

# Load data at startup
processed_data = pd.read_csv('processed_data.csv')

with open('analysis_results.json', 'r') as f:
    analysis_results = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/summary')
def get_summary():
    summary = {
        'total_transactions': analysis_results['total_transactions'],
        'total_revenue': f"${analysis_results['total_revenue']:,.2f}",
        'avg_units_sold': f"{analysis_results['avg_units_sold']:.2f}",
        'categories': analysis_results['categories_count']
    }
    return jsonify(summary)

@app.route('/api/revenue-by-region')
def get_revenue_by_region():
    return jsonify(analysis_results['revenue_by_region'])

@app.route('/api/revenue-by-placement')
def get_revenue_by_placement():
    return jsonify(analysis_results['revenue_by_placement'])

@app.route('/api/revenue-by-category')
def get_revenue_by_category():
    return jsonify(analysis_results['revenue_by_category'])

@app.route('/api/raw-data')
def get_raw_data():
    data = processed_data.to_dict('records')
    return jsonify(data)

@app.route('/api/top-products')
def get_top_products():
    return jsonify(analysis_results['top_products'])

@app.route('/api/placement-effectiveness')
def get_placement_effectiveness():
    return jsonify(analysis_results['placement_effectiveness'])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)