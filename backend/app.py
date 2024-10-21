from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

uat_plan = []

@app.route('/api/uat-plan', methods=['GET', 'POST'])
def handle_uat_plan():
    global uat_plan
    if request.method == 'POST':
        data = request.json
        workstreams = data['workstreams']
        stakeholders = data['stakeholders']
        scope_items = data['scope_items']
        
        uat_plan = []
        start_date = datetime.now()
        for workstream in workstreams:
            for scope_item in scope_items:
                test_case = f"Test {workstream} - {scope_item}"
                stakeholder = stakeholders[len(uat_plan) % len(stakeholders)]
                end_date = start_date + timedelta(days=3)
                uat_plan.append({
                    "Workstream": workstream,
                    "Test Case": test_case,
                    "Stakeholder": stakeholder,
                    "Start Date": start_date.strftime("%Y-%m-%d"),
                    "End Date": end_date.strftime("%Y-%m-%d"),
                    "Status": "Not Started"
                })
                start_date = end_date + timedelta(days=1)
        return jsonify(uat_plan), 201
    else:
        return jsonify(uat_plan)

if __name__ == '__main__':
    app.run(debug=True)