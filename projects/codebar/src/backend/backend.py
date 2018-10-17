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
	return participantsDF

app = Flask(__name__)

@app.route('/group')
# def group_students(data):
	# group students according to language field
	# dataFrame = pd.DataFrame(data)
	# output = dataFrame.groupBy('language')
    # return data

def group():
	participantsDF = get_data()
	attendingDF = participantsDF[participantsDF.signed == 0]
	participants = participantsDF[attendingDF.coach_flag == 0]
	participants = participants.sort_values(['language'])
	
	def rolling_count(val):
		if val == rolling_count.previous:
			rolling_count.count += 1
		else:
			rolling_count.previous = val
			rolling_count.count = 1

		return rolling_count.count

	rolling_count.count = 0 
	rolling_count.previous = None

	def make_small(val):
		if val % 2 == 0:
			val -= 1
		else:
			val
		return val

	make_small.count = 0
	make_small.previous = None

	participants['testy'] = participants['language'].apply(rolling_count)

	participants['group'] = participants['testy'].apply(make_small)
	participants = participants[['name','language','group']]

	print(participantsDF.name.unique())
	# output = group_students(data)
	# output.coachCount = 0
	# output.studentCount = 0
	# output.groupCount = [[4,3], [2,3], [5,1]]
	# return jsonify(output)
	df_list = participants.values.tolist()
	return jsonify(df_list)



# group()

