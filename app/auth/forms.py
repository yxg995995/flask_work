from wtforms import StringField, PasswordField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import Required,Length,Email,Regexp


class Login_form(FlaskForm):
    name = StringField('用户名',validators=[Required(), Length(0, 64)])
    password = PasswordField('密码', validators=[Required(), Length(8, 12)])
    submit = SubmitField('登陆')


class register_form(Login_form):
    email = StringField('邮箱', validators=[Required(), Length(1, 64), Email()])
    submit = SubmitField('注册')
