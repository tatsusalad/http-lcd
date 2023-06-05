from machine import Pin
from gpio_lcd import GpioLcd
import network
import socket
import time

ssid = 
password = 

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)



# Create the LCD object
lcd = GpioLcd(rs_pin=Pin(16),
              enable_pin=Pin(17),
              d4_pin=Pin(18),
              d5_pin=Pin(19),
              d6_pin=Pin(20),
              d7_pin=Pin(21),
              num_lines=2, num_columns=16)
 
heart = bytearray([0x00,0x00,0x0A,0x1F,0x1F,0x0E,0x04,0x00])
lcd.custom_char(0, heart)
time.sleep(6)
sts = wlan.ifconfig()[0]
print(sts)
lcd.putstr(sts)

addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
s = socket.socket()
s.bind(addr)
s.listen(1)
lcd.putstr(":" + str(addr[1]))

while True:
    try:
        cl, addr = s.accept()
        print('client connected from', addr)
        request = cl.recv(1024)
        print(request)
    
        request = str(request)
        request = request.replace("\\r\\n\\r\\n", ">")
        request = request.split(">")
        print(request)
        hearty = request[1].strip("'")
        hearty = hearty.strip('"')
        lcd.clear()
        lcd.putstr(hearty)
        cl.send('HTTP/1.0 200 OK\r\nContent-type: text/html\r\n\r\n')
        cl.close()
    except OSError as e:
        cl.close()
        print("conned")


