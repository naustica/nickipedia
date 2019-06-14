from flask import Flask, render_template

app = Flask(__name__)

posts = [
    {
        'author': 'naustica',
        'username': 'naustica',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga vel, voluptates, doloremque nesciunt illum est corrupti nostrum expedita adipisci dicta vitae? Eveniet maxime quibusdam modi molestias alias et incidunt est.',
    },
    {
        'author': 'naustica',
        'username': 'naustica',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga vel, voluptates, doloremque nesciunt illum est corrupti nostrum expedita adipisci dicta vitae? Eveniet maxime quibusdam modi molestias alias et incidunt est.',
    },
    {
        'author': 'naustica',
        'username': 'naustica',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga vel, voluptates, doloremque nesciunt illum est corrupti nostrum expedita adipisci dicta vitae? Eveniet maxime quibusdam modi molestias alias et incidunt est.',
    },
    {
        'author': 'naustica',
        'username': 'naustica',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga vel, voluptates, doloremque nesciunt illum est corrupti nostrum expedita adipisci dicta vitae? Eveniet maxime quibusdam modi molestias alias et incidunt est.',
    },
    {
        'author': 'naustica',
        'username': 'naustica',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga vel, voluptates, doloremque nesciunt illum est corrupti nostrum expedita adipisci dicta vitae? Eveniet maxime quibusdam modi molestias alias et incidunt est.',
    },
    {
        'author': 'naustica',
        'username': 'naustica',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga vel, voluptates, doloremque nesciunt illum est corrupti nostrum expedita adipisci dicta vitae? Eveniet maxime quibusdam modi molestias alias et incidunt est.',
    }
]

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html', posts=posts)

@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)
