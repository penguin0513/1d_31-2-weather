WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    basic.showIcon(IconNames.Yes)
})
WiFiIoT.on_thingspeak_conn(function (Status, Error_code) {
    OLED.clear()
    OLED.writeStringNewLine("Thingspeak:" + Status)
    OLED.writeStringNewLine("Error code:" + Error_code)
})
let temperature = 0
OLED.init(128, 64)
WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
WiFiIoT.setWifi("YLL_R206", "2448yll0622")
let raindrop = 0
let humidity = 0
basic.forever(function () {
    if (WiFiIoT.is_wifi_connect()) {
        temperature = SmartCity.readData(SmartCity.DHT11dataType.temperature, DigitalPin.P2)
        humidity = SmartCity.readData(SmartCity.DHT11dataType.humidity, DigitalPin.P2)
        raindrop = SmartCity.read_raindrop_sensor(AnalogPin.P0)
        OLED.clear()
        OLED.writeStringNewLine("temperature:" + temperature)
        OLED.writeStringNewLine("humidity:" + humidity)
        OLED.writeStringNewLine("raindrop:" + raindrop)
        WiFiIoT.sendThingspeak(
        "I3H0WNBYGGPPNVA2",
        temperature,
        humidity,
        raindrop
        )
        basic.pause(10000)
    }
})
