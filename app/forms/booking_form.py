from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class BookingCreateForm(FlaskForm):
    start_date = StringField('Start Date', validators=[DataRequired()])
    submit = SubmitField('Create')

class BookingUpdateForm(FlaskForm):
    start_date = StringField('Start Date', validators=[DataRequired()])
    submit = SubmitField('Update')
