#
# Deployment makefile, creates docker image locally
# Assumes just a clone from github has been done and npm is available on path
#
build:
	cd wificontrolui; npm install; npm run build
	cp -R wificontrolui/build/* wificontrol/public/.
	cd wificontrol; npm install
	docker build . --tag wificontrol
