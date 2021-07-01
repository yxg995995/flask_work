import datetime

from flask import render_template, request, current_app, flash, \
    redirect, url_for
from flask_login import login_required,current_user
from . import blog
from .. import db
from ..models import Post, Comment, User
from .forms import blog_form, comment_form


@blog.route('/', defaults={'page': 1})
@blog.route('/page/<int:page>')
def home(page):
    per_page = current_app.config['BLOG_POST_PER_PAGE']
    pagination = Post.query.order_by(Post.timestamp.desc()). \
        paginate(page, per_page=per_page)
    posts = pagination.items
    return render_template('index.html', pagination=pagination, posts=posts,
                           title='博客首页')


@blog.route('/show_post/<int:post_id>', methods=['GET', 'POST'])
def show_post(post_id):
    post = Post.query.get(post_id)
    comments = Comment.query.filter_by(post_id=post_id) \
        .order_by(Comment.timestamp.desc()).all()
    users = []
    for i in comments:
        users.append(User.query.get(i.author_id).username)
    form = comment_form()
    return render_template('detail.html',
                           post=post, result=zip(comments, users),
                           title='文章详情', form=form)


@blog.route('/myblog/<username>/', defaults={'page': 1})
@blog.route('/myblog/<username>/<int:page>')
@login_required
def my_blog(username, page):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('please login first')
        return redirect(url_for('auth.login'))
    user_id = user.id
    per_page = current_app.config['BLOG_POST_PER_PAGE']
    pagination = Post.query.filter_by(author_id=user_id) \
        .order_by(Post.timestamp.desc()).paginate(page, per_page=per_page)
    posts = pagination.items
    return render_template('index.html', pagination=pagination, posts=posts,
                           title='我的博客')


@blog.route('/about/<username>/')
@login_required
def about(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('please login first')
        return redirect(url_for('auth.login'))
    if user.about is None:
        user.about = '暂无介绍'
        if user.name is None:
            user.name = '暂无信息'
    return render_template('about.html', user=user, title='关于我')


@blog.route('/write/<username>', methods=['GET', 'POST'])
@login_required
def write_blog(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('please login first')
        return redirect(url_for('auth.login'))
    else:
        form = blog_form()
        user_id = user.id
        if form.validate_on_submit():
            timestamp = datetime.datetime.utcnow()
            post = Post(title=form.title.data, body=form.body.data,
                        author_id=user_id, timestamp=timestamp)
            db.session.add(post)
            db.session.commit()
            flash('submit post success')
            return redirect(url_for('blog.write_blog', username=username))
        return render_template('write.html', form=form)


@blog.route('/comment/<username>/<int:post_id>', methods=['POST'])
@login_required
def write_comment(username, post_id):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('please login first')
        return redirect(url_for('auth.login'))
    else:
        form = comment_form()
        user_id = user.id
        if form.validate_on_submit():
            comment = Comment(author_id=user_id, post_id=post_id,
                              body=form.body.data)
            db.session.add(comment)
            db.session.commit()
            flash('submit comment success')
            return redirect(url_for('blog.show_post', post_id=post_id))
        else:
            flash('warning message')
        return redirect(url_for('blog.show_post', post_id=post_id))
