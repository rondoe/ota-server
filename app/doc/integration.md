# Integration

## Self Signed Certificates

If you are using self signed certificates, you need to include the sha1 fingerprint in your update requests.

```
t_httpUpdate_return ret = ESPhttpUpdate.update("https://upthrow.rondoe.com/update/esp?token=xhestcal842myu1ewrupfgpxsy1b352cq2psfohs2nrdxmvsxu0036pw9tdh5f4b", "", "A8 A8 4C 5D C7 5D 03 BB 1A 4C 47 13 B9 33 4C A6 4D AF 4A 63");
```

## Demo

```
t_httpUpdate_return ret = ESPhttpUpdate.update("https://upthrow.rondoe.com/update/esp?token=xhestcal842myu1ewrupfgpxsy1b352cq2psfohs2nrdxmvsxu0036pw9tdh5f4b", "", "A8 A8 4C 5D C7 5D 03 BB 1A 4C 47 13 B9 33 4C A6 4D AF 4A 63");

    switch(ret) {
    case HTTP_UPDATE_FAILED:
            Serial.printf("HTTP_UPDATE_FAILD Error (%d): %s", ESPhttpUpdate.getLastError(), ESPhttpUpdate.getLastErrorString().c_str());
            Serial.println();
            break;

    case HTTP_UPDATE_NO_UPDATES:
            Serial.println("HTTP_UPDATE_NO_UPDATES");
            break;

    case HTTP_UPDATE_OK:
            Serial.println("HTTP_UPDATE_OK");
            break;
    }
```

A full working sample can be found under <https://github.com/rondoe/pio-travis-ota>
