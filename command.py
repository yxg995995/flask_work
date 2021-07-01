import click
from app.fakes import *
import run

@run.cli.command()
@click.option('--user', default=3, help='Quantity of messages,default is 3')
@click.option('--post', default=50, help='Quantity of messages,default is 50')
@click.option('--comment', default=200,
              help='Quantity of messages,default is 200')
def forge(user, post, comment):
    db.drop_all()
    db.create_all()
    click.echo('Generating the %d user...' % user)
    fake_user()
    click.echo('Generating the %d post...' % post)
    fake_post(post)
    click.echo('Generating the %d comment' % comment)
    fake_comment(comment)
    click.echo('over')

