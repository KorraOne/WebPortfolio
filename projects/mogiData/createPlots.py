
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

derivedDataDF = pd.read_excel('MogiData.xlsx', sheet_name="DerivedData", header=None)
RunningTotalDF = pd.read_excel('MogiData.xlsx', sheet_name="RunningTotals", header=None)

def extractFromLoungWebpage():
  import requests
  from bs4 import BeautifulSoup

  url = "https://www.mk8dx-lounge.com/PlayerDetails/59937?season=12"
  response = requests.get(url)

  if response.status_code == 200:
    html = response.text
  else:
    print(f"Failed to get html. Status Code: {response.status_code}")
    html = ""

  soup = BeautifulSoup(html, 'html.parser')
  mmrTD = soup.find_all('td', class_='rank-Iron')

  mmrVals = []
  for td in mmrTD:
    mmrVal = td.text.strip()
    mmrVals.append(mmrVal)

  mmrVals.reverse()
  return mmrVals

def createPlacementDistribution():
  xValues = range(1, 13)
  yValues = derivedDataDF.iloc[10, 2:14].tolist()

  plt.figure(figsize=(6, 4))
  plt.bar(xValues, yValues, color='skyblue', edgecolor='black')

  plt.title('Distributions of Placements achieved')
  plt.xlabel('Placement: 1st - 12th')
  plt.ylabel('Amount of Each Placement')

  plt.xticks(xValues)

  plt.savefig('plotImages/placementDistribution.png') 
  plt.close()

def createScoreTrend():
  xValues = range(1, 13)
  yValues1 = derivedDataDF.iloc[6, 2:14].tolist()
  yValues2 = derivedDataDF.iloc[7, 2:14].tolist()

  plt.figure(figsize=(6, 4))
  plt.plot(xValues, yValues1, marker='o', label='Average Score')
  plt.plot(xValues, yValues2, marker='s', label='Cumulative Score')

  plt.title('Average Score per Race')
  plt.xlabel('Race Number')
  plt.ylabel('Score')
  plt.legend()
  plt.grid(True)

  plt.savefig('plotImages/scoresTrend.png') 
  plt.close()

def createAveragePlacement():
  xValues = range(1, 13)
  yValues = derivedDataDF.iloc[5, 2:14].tolist()

  plt.figure(figsize=(6, 4))
  plt.bar(xValues, yValues, color='skyblue', edgecolor='black')

  plt.title('Average Placement per Race')
  plt.xlabel('Race Number')
  plt.ylabel('Average Placement')

  plt.xticks(xValues)

  plt.savefig('plotImages/averagePlacement.png') 
  plt.close()

def createMMRtrend():
  mmr = extractFromLoungWebpage()

  y_values = [int(value) for value in mmr]
  x_values = np.arange(len(mmr))

  slope, intercept = np.polyfit(x_values, y_values, 1)
  best_fit_line = slope * x_values + intercept

  plt.figure(figsize=(6, 4))
  plt.scatter(x_values, y_values, marker='o', label='Data Points')
  plt.plot(x_values, best_fit_line, color='red', label=f'Line of Best Fit: y = {slope:.2f}x + {intercept:.2f}')

  plt.title('Scatter Plot with Line of Best Fit')
  plt.xlabel('Index')
  plt.ylabel('Values')

  plt.legend()
  plt.grid(True)

  plt.savefig('plotImages/mmrTrends.png') 
  plt.close()

def createMultiScoreTrend():
  points = []
  rowNum = len(RunningTotalDF)

  for i in range(1, rowNum):
    lst = RunningTotalDF.iloc[i, 1:14].tolist()
    points.append(lst)

  plt.figure(figsize=(6, 4))

  for index, inner_list in enumerate(points):
      plt.plot(range(1, 13), inner_list, marker='o', label=f'Line {index+1}')

  plt.title('All Races Scores Path')
  plt.xlabel('Race Num')
  plt.ylabel('Cumulative Score Total')
  plt.grid(True)

  plt.savefig('plotImages/multiScoreTrend.png') 
  plt.close()
  

createPlacementDistribution()
createScoreTrend()
createAveragePlacement()
createMMRtrend()
createMultiScoreTrend()