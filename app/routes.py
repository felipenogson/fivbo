from flask import render_template, flash, redirect, url_for, request
from app import app, db
from app.forms import LoginForm, RegistrationForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User
from werkzeug.urls import url_parse


@app.route('/')
@app.route('/index')
def index():
    login_form = LoginForm()
    register_form = RegistrationForm()
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home', posts=posts, login_form=login_form, register_form=register_form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('app'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username of password', 'danger')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('app')
        return redirect(next_page)
    # return render_template('login.html',  title='Sign In', form=form)
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    logout_user()
    flash('You have been loged out. It was nice to see you again', 'success')
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    register_form = RegistrationForm()
    login_form = LoginForm()

    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if register_form.validate_on_submit():
        if register_form.invitation_code.data != "cat":
            flash('Sorry, registering is by invitation right now', 'danger')
            return redirect(url_for('index')) 
        user = User(username=register_form.username.data, email=register_form.email.data)
        user.set_password(register_form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user', 'success')
        login_user(user)
        return redirect(url_for('app'))
    return render_template('register.html', title="Registration Form", register_form=register_form, login_form=login_form)

@app.route('/app')
@login_required
def app():
    login_form = LoginForm()
    return render_template('app.html', title="FivboAPP", login_form=login_form)