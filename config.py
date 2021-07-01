import os.path

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = 'smtp.qq.com'
    MAIL_USE_TLS = True
    MAIL_PORT = 587
    MAIL_USERNAME = '2931148038@qq.com'
    MAIL_PASSWORD = 'inkdebnodyuzdhfe'
    MAIL_DEFAULT_SENDER = ('YXG', '2931148038@qq.com')
    BLOG_POST_PER_PAGE = 10
    CKEDITOR_SERVE_LOCAL = True


    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = \
        os.getenv('DATABASE_URL', 'postgresql://postgres:123456@localhost/blog')


config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
