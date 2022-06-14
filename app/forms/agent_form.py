from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class AgentCreateForm(FlaskForm):
    first_name = StringField('firstName', validators=[DataRequired()])
    last_name = StringField('lastName', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    phone = StringField('Phone', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])

    submit = SubmitField('Create')
