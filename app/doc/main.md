# Welcome

## Uploading

You can upload new firmware files using this app or using for e.g. curl
```
curl --request POST -F file=@firmware.bin --user {user}:{apiKey} http://upthrow.yourdomain.com/devices/{deviceid}/upload
```
