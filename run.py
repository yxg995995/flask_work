from app import create_app, db
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from app.fakes import fake_user,fake_comment,fake_post
import click
from app.fakes import *
app = create_app('development')
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.option('-u', '--user', dest='user')
@manager.option('-p', '--post', dest='post')
@manager.option('-c', '--comment', dest='comment')
def forge(user, post, comment):
    db.drop_all()
    db.create_all()
    click.echo('Generating the %s user...' % user)
    fake_user()
    click.echo('Generating the %s post...' % post)
    fake_post()
    click.echo('Generating the %s comment' % comment)
    fake_comment()
    click.echo('over')

if __name__ == "__main__":
    manager.run()
