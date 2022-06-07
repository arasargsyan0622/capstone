from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField, SelectField
from wtforms.validators import DataRequired

class ReviewCreateForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    rating = SelectField('Rating', choices=[("bad"), ("good")], validators=[DataRequired()])
    submit = SubmitField('Create')

class ReviewUpdateForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    rating = SelectField('Rating', validators=[DataRequired()])
    submit = SubmitField('Update')
