import flask
from flask_cors import CORS
import os
import json

PORT = 4000
app = flask.Flask(__name__)
CORS(app) #, origins=[f"http://localhost:{PORT}", f"https://localhost:{PORT}"])

# Routes are relative to being run from /dist/api
ROOT_PATH = "../.."

def getJSON():
	contentType = flask.request.headers.get('Content-Type')
	if (contentType != "application/json"):
		raise Exception(f"Content-Type \"{contentType}\" not supported.")
	return flask.request.json

def printError(msg: str, code: int = 400, e: Exception or None = None) -> Exception:
	print(msg)
	if e is not None:
		print(e)
	return msg, code

# -- STATIC FILES -- #

@app.route("/client/")
def serveStaticClientIndex():
	return flask.send_file(f"{ROOT_PATH}/dist/index.html")

@app.route("/client/<path:path>")
def serveStaticClient(path):
	return flask.send_from_directory(f"{ROOT_PATH}/dist/", path)

@app.route("/client/assets/<path:path>")
def serveStaticClientAssets(path):
	return flask.send_from_directory(f"{ROOT_PATH}/assets/", path)

@app.route("/client/data/<path:path>")
def serveStaticClientData(path):
	return flask.send_from_directory(f"{ROOT_PATH}/data/", path)


# -- USER DATA -- #

class ExperimentData:
	def __init__(self, body):
		self.id = body["id"]
		self.firstPlayerId = body["firstPlayerId"]
		self.secondPlayerId = body["secondPlayerId"]
		self.loggingData = body["loggingData"]
		self.images = body["images"]
		self.sectionIndex = body["sectionIndex"]
		self.stepIndex = body["stepIndex"]
		self.experimentType = body["experimentType"]

@app.route("/startExperiment", methods=["POST"])
def startExperiment():
	body = getJSON()
	experimentData = ExperimentData(body)
	if (experimentData.id is None):
		return printError("No experiment ID was supplied.", 400)
	
	filepath = os.path.abspath("../../data/" + experimentData.id)
	jsonFile = filepath + "/" + experimentData.id + ".json"

	if (os.path.exists(filepath)):
		# Experiment already exists
		if (not os.path.exists(jsonFile)):
			return printError("JSON for existing experiment does not exist.", 400)
		savedExperimentData = ExperimentData(json.load(jsonFile))
		if (savedExperimentData.firstPlayerId != experimentData.firstPlayerId) or (savedExperimentData.secondPlayerId != experimentData.secondPlayerId):
			return printError("Player ID(s) do not match the saved ones for existing experiment.", 400)
		return {
			"isExistingExperiment": True,
			"experimentData": vars(savedExperimentData)
		}
	else:
		# New experiment
		try:
			stringified = json.dumps(vars(experimentData))
			os.mkdir(filepath)
			f = open(jsonFile, "w")
			f.write(stringified)
			f.close()
			return {
				"isExistingExperiment": False,
				"experimentData": vars(experimentData)
			}
		except Exception as e:
			return printError(f"Failed to save new experiment to file.", e, 400)

@app.route("/experiment", methods=["POST"])
def updateExperimentData():
	# TODO
	return printError("Not yet implemented.", 400)


# -- IMAGE GENERATION -- #

@app.route("/image-gen", methods=["POST"])
def imageGen():
	# TODO
	return printError("Not yet implemented.", 400)

@app.route("/image-variation", methods=["POST"])
def imageVariation():
	# TODO
	return printError("Not yet implemented.", 400)


# -- TEXT GENERATION -- #

@app.route("/applyContexts", methods=["POST"])
def applyContextsToGuideline():
	# TODO
	return printError("Not yet implemented.", 400)

@app.route("/applyContextsToRange", methods=["POST"])
def applyContextsToGuidelineRange():
	# TODO
	return printError("Not yet implemented.", 400)

@app.route("/genUFPrompt", methods=["POST"])
def genUFPrompt():
	# TODO
	# Might be helpful to additionally have the context of what kind of activity a user is doing, but may not be necessary.
	return printError("Not yet implemented.", 400)


# -- CONTEXT DISCOVERY -- #

@app.route("/discoverContexts", methods=["POST"])
def discoverContexts():
	body = getJSON()
	userContextCandidates = body["userContextCandidates"]
	imageContextCandidates = body["imageContextCandidates"]
	systemContextCandidates = body["systemContextCandidates"]
	topN = body["topN"]
	# TODO
	return printError("Not yet implemented.", 400)

# TODO: Image segmentation


if __name__ == "__main__":
    # TODO: This needs to change for deployment. 0.0.0.0 on port 80 I think.
    app.run("127.0.0.1", port=PORT, debug=True)
