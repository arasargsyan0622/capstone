from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField, SelectField
from wtforms.validators import DataRequired

class ListingCreateForm(FlaskForm):
    title = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    size = IntegerField('Size', validators=[DataRequired()])
    is_available = BooleanField('Is Available', validators=[DataRequired()])
    year_built = IntegerField('Year Built', validators=[DataRequired()])
    bedrooms = IntegerField('Bedrooms', validators=[DataRequired()])
    bathrooms = IntegerField('Bathrooms', validators=[DataRequired()])
    parking = BooleanField('Parking')
    laundry = BooleanField('Laundry')
    user_id = IntegerField('UserId', validators=[DataRequired()])
    agent_id = IntegerField('AgentId', validators=[DataRequired()])


class ListingUpdateForm(FlaskForm):
    title = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    is_available = BooleanField('Is Available', validators=[DataRequired()])
