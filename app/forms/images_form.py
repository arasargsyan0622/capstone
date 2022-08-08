from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ImageCreateForm(FlaskForm):
    url = StringField('Url', validators=[DataRequired()])
    submit = SubmitField('Create')
