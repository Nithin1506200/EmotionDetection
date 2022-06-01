from flask import Flask, render_template, Response
from camera import Video
import json

app=Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
def gen(camera):
    while True:
        frame=camera.get_frame()
        yield(b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n' + frame +
        b'\r\n\r\n')
@app.route('/video')
def video():
    return Response(gen(Video()),
    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__== "__main__":
    jsn={'detected': False,'pred':{}}
    with open('static/result/result.json', 'w') as f:
        json.dump(jsn, f)
    app.run(debug=True)