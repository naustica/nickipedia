from functools import wraps
from flask import request, flash
import os
from data import basedir
from werkzeug import secure_filename
import time


def add_uploader(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if request.method == 'POST':
            try:
                f = request.files.get('file')
                f.save(os.path.join(basedir, 'uploads/') + secure_filename(f.filename))
                time.sleep(1)
                flash('uploaded')
            except:
                flash('error-image-uploading')
        return function(*args, **kwargs)
    return wrapper
