#
#
build:
	docker build . --tag wificontrol
	docker create \
		--name wifi-control \
		-p 4000:3001 \
		--restart=unless-stopped

start:
	docker start wifi-control
