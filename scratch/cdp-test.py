import json
import os
import subprocess
import time
import urllib.request
import urllib.error

profile_dir = r"C:\Users\Siam\.gemini\antigravity\brain\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\chrome-profile"
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
screenshot_path = r"C:\Users\Siam\.gemini\antigravity\brain\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\scholarly_controls_rendered.png"

# Launch headless Chrome with remote debugging
proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    "--remote-debugging-port=9222",
    f"--user-data-dir={profile_dir}",
    "--disable-gpu",
    "--no-first-run",
    "--window-size=1200,900"
])

print("Launched Chrome, waiting for port 9222...")
time.sleep(2)

try:
    # Get WebSocket debugger URL
    req = urllib.request.urlopen("http://localhost:9222/json/new?http://localhost:5173/preview.html?theme=scholarly-press")
    tab = json.loads(req.read().decode('utf-8'))
    ws_url = tab["webSocketDebuggerUrl"]
    target_id = tab["id"]
    print("Opened tab, ws_url:", ws_url)
    
    # We can use simple HTTP target or websocket. Let's install websocket-client or use a standalone script.
except Exception as e:
    print("Error querying tab:", e)
finally:
    proc.terminate()
