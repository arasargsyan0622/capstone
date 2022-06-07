from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ReviewCreateForm(FlaskForm):
    title = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    submit = SubmitField('Create')

class ReviewUpdateForm(FlaskForm):
    title = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    submit = SubmitField('Update')
