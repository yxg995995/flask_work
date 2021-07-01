import random
from app.models import User, Post, Comment
from faker import Faker
from sqlalchemy.exc import IntegrityError
from app.models import db
import forgery_py
fake = Faker()


def fake_user(counts=3):
    for i in range(counts):
        user = User(
            email=forgery_py.internet.email_address(),
            username=forgery_py.internet.user_name(),
            password_hash=forgery_py.lorem_ipsum.word(),
            name=forgery_py.name.full_name(),
            about=forgery_py.lorem_ipsum.sentence()
        )
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()


def fake_post(counts=50):
    user_count = User.query.count()
    for i in range(counts):
        user_id = User.query.get(random.randint(1, user_count)).id
        post = Post(
            title=fake.sentence()[:60],
            body=fake.text(2000),
            timestamp=forgery_py.date.date(True),
            author_id=user_id
        )
        db.session.add(post)
        db.session.commit()


def fake_comment(count=200):
    for i in range(count):
        comment = Comment(
            author_id=User.query.get(random.randint(1, User.query.count())).id,
            post_id=Post.query.get(random.randint(1, Post.query.count())).id,
            body=fake.sentence(),
            timestamp=forgery_py.date.date(True),
        )
        db.session.add(comment)
    db.session.commit()
    # 回复
    for i in range(int(count*0.1)):
        comment = Comment(
            author_id=User.query.get(random.randint(1, User.query.count())).id,
            post_id=Post.query.get(random.randint(1, Post.query.count())).id,
            body=fake.sentence(),
            timestamp=forgery_py.date.date(True),
            replied=Comment.query.get(random.randint(1, Comment.query.count()))
        )
        db.session.add(comment)
    db.session.commit()

