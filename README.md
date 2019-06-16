#  WiFiControl - a web companion app for OpenWRT firewall control

OpenWRT unlocks the potential in a consumer router, it also avoids getting stuck with manufacturer software bugs or unpatched security issues. While the luCI web interface is quite good, it's not app level friendly to use.

This project is an attempt to build a simple web app to provide easy control over some of your firewall rules. It's built on Node.js with Express and React.


## Firewall rules

The backend will query your OpenWRT firewall rules. Rules which begin with the text 'APP-' will be exposed to the app. The text that follows 'APP-' will be used as the name in the app.

In terms of the configuration file `/etc/config/firewall`

The rule would be defined as below

```
config rule
        option src 'lan'
        option name 'APP-Kids Tablet'
        option enabled '0'
        option src_mac '09:22:0B:54:0A:35'
        option target 'REJECT'
        option dest 'wan'
```
Note that it is disabled as configured, but the app will allow us to change this state.

## OpenWRT extensions

https://github.com/openwrt/luci/wiki/JsonRpcHowTo

## Useful Links
https://www.taniarascia.com/getting-started-with-react/

https://github.com/aaronshaf/react-toggle

https://daveceddia.com/create-react-app-express-backend/

