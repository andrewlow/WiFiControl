#
#
build:
	docker build . --tag wificontrol
	docker create \
		--name wifi-control \
		-p 4000:3001 \
		--restart=unless-stopped \
		wificontrol

start:
	docker start wifi-control

update:
	- docker rm wifi-control-old
	docker rename wifi-control wifi-control-old
	make build
	docker stop wifi-control-old
	make start

