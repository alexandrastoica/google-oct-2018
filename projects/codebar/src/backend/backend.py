#!/usr/bin/env python
# coding: utf-8

from flask import Flask
from flask import jsonify
import pandas as pd
import gspread
from oauth2client.service_account import ServiceAccountCredentials

def get_data():
	scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
	creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
	client = gspread.authorize(creds)
	sheet = client.open("dummy_participants").sheet1

	data = sheet.get_all_records()
	participantsDF = pd.DataFrame(data)
	participantsDF.name.unique()
	participantsDF.head()
	attendingDF = participantsDF[participantsDF.signed == 0]
	coachCount = len(attendingDF[participantsDF.coach_flag == 1])
	participantCount = len(attendingDF[participantsDF.coach_flag == 0])
	return data

app = Flask(__name__)

@app.route('/group')
# def group_students(data):
	# group students according to language field
	# dataFrame = pd.DataFrame(data)
	# output = dataFrame.groupBy('language')
    # return data
    
def group():
	data = get_data()
	participantsDF = pd.DataFrame(data)
	
	print(participantsDF.name.unique())
	# output = group_students(data)
	# output.coachCount = 0
	# output.studentCount = 0
	# output.groupCount = [[4,3], [2,3], [5,1]]
	# return jsonify(output)
	return 'Hello, World'

# group()