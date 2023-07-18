kill -9 `cat vsui_web_pid.txt` rm vsui_web_pid.txt
nohup http-server -p 7600 dist/vsui > vsui.log 2>&1 & echo $! > vsui_web_pid.txt