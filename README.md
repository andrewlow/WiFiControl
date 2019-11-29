#  WiFiControl - a web companion app for OpenWRT firewall control

OpenWRT unlocks the potential in a consumer router, it also avoids getting stuck with manufacturer software bugs or unpatched security issues. While the luCI web interface is quite good, it's not app level friendly to use.

This project is an attempt to build a simple web app to provide easy control over some of your firewall rules. It's built on Node.js with Express and React.


## Deploying this

Create the secrets in wificontrol/config/default.json following the template provided.
Running `make` will do a multi-stage docker build and create an image called `wificontrol` and a container `wifi-control` ready to run
To start the container `make start` will get it running
It will listen on port 4000 mapped to the 3001 port in the container

## Firewall rules

The wificontrol/config/default.json file contains a list of firewall rules. This is used to identify which rules we will be manipulating in your OpenWRT.

To determine the rule number, I suggest ssh'ing into your openwrt devices and issuing

```
$ uci show firewall | grep name
```

This will show you the names and numbers of the firewall rules.

You can then use this information to fill in the table, adding or removing rows as needed

```
  // Firewall rule mapping
  "users" : [
    { name: "Child1", rule: 12, enabled: true },
    { name: "Tablet", rule: 14, enabled: true },
    { name: "Computer", rule: 13, enabled: true }
  ]
```

The logic for `enabled: true` is not about the rule being enabled, but that traffic is allowed. The app should refresh this automatically to align with the state of your router, but it's nice to make it correct on bootstrap.

## OpenWRT extensions

https://github.com/openwrt/luci/wiki/JsonRpcHowTo

## Resources

Icon from https://www.iconfinder.com/icons/4307973/eye_illuminati_pyramid_triangle_icon

## Useful Links
https://www.taniarascia.com/getting-started-with-react/

https://github.com/aaronshaf/react-toggle

https://daveceddia.com/create-react-app-express-backend/

https://openwrt.org/docs/guide-user/base-system/uci

https://docs.docker.com/develop/develop-images/multistage-build/
