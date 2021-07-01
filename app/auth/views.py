from flask_login import login_user, current_user,logout_user,login_required
from ..models import User
from .. import db
from . import auth
from .forms import Login_form, register_form
from flask import render_template, redirect, url_for, flash


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('blog.home'))
    form = Login_form()
    operation = '注册'
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.name.data).first()
        if user is not None and user.password_hash == form.password.data:
            login_user(user)
            return redirect(url_for('blog.home'))
        flash('Invalid username or password', 'waring')
    return render_template('login.html', form=form, operation=operation)


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('blog.home'))
    form = register_form()
    operation = '登陆'
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None:
            flash('user is already exit')
        else:
            new_user = User(username=form.name.data, email=form.email.data,
                            password_hash=form.password.data)
            db.session.add(new_user)
            db.session.commit()
            flash('create new user success')
            return redirect(url_for('auth.login'))
    return render_template('login.html', form=form, operation=operation)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))