from flask import Flask, render_template, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from datetime import datetime

app = Flask(__name__)

def get_data():
    try:
        df = pd.read_excel('MogiData.xlsx', sheet_name="DerivedData", header=None)
        averagePlacement = df.iloc[5, 2:14].tolist()
        averageScore = df.iloc[6, 2:14].tolist()
        averageRunningScore = df.iloc[7, 2:14].tolist()
        placementCounts = df.iloc[10, 2:14].tolist()
        print("Data loaded successfully")
        return averagePlacement, averageScore, averageRunningScore, placementCounts
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return [], [], [], []

def create_plot(averageScore, averageRunningScore, placementCounts):
    try:
        xValues = range(1, 13)
        
        # Create bar plot
        plt.figure(figsize=(6, 4))
        plt.bar(xValues, placementCounts, color='skyblue', edgecolor='black')
        plt.title('Placements Distribution')
        plt.xlabel('Placement Number')
        plt.ylabel('Count of Each Placement')
        plt.xticks(xValues)
        bar_img = io.BytesIO()
        plt.savefig(bar_img, format='png')
        bar_img.seek(0)
        bar_plot_url = base64.b64encode(bar_img.getvalue()).decode()
        print(f"Bar plot created successfully, URL: {bar_plot_url[:50]}...")

        # Create line plot
        races = range(1, 13)
        plt.figure(figsize=(6, 4))
        plt.plot(races, averageScore, marker='o', label='Average Placements')
        plt.plot(races, averageRunningScore, marker='s', label='Cumulative Placements')
        plt.title('Average Score per Race Num')
        plt.xlabel('Race Number')
        plt.ylabel('Score')
        plt.legend()
        plt.grid(True)
        line_img = io.BytesIO()
        plt.savefig(line_img, format='png')
        line_img.seek(0)
        line_plot_url = base64.b64encode(line_img.getvalue()).decode()
        print(f"Line plot created successfully, URL: {line_plot_url[:50]}...")
        
        return bar_plot_url, line_plot_url
    except Exception as e:
        print(f"Error creating plots: {e}")
        return "", ""

@app.route('/')
def home():
    averagePlacement, averageScore, averageRunningScore, placementCounts = get_data()
    bar_plot_url, line_plot_url = create_plot(averageScore, averageRunningScore, placementCounts)
    print(f"Rendering template with bar_plot_url: {bar_plot_url[:50]}..., line_plot_url: {line_plot_url[:50]}...")
    return render_template('index.html', bar_plot_url=bar_plot_url, line_plot_url=line_plot_url, timestamp=datetime.now())

if __name__ == '__main__':
    app.run(debug=True)
