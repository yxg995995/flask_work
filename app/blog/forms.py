from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import Required, Length
from flask_ckeditor import CKEditorField


class blog_form(FlaskForm):
    title = StringField('标题',validators=[Required(), Length(1, 60)])
    body = CKEditorField('内容', validators=[Required(), Length(10, 2000)])
    submit = SubmitField('提交')


class comment_form(FlaskForm):
    body = TextAreaField(render_kw={'placeholder': '写下您的评论'},
                         validators=[Required(), Length(1, 50)])
    submit = SubmitField('提交')