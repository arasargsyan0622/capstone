from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField, SelectField, FloatField
from wtforms.validators import DataRequired

# validators

class ListingCreateForm(FlaskForm):
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    size = IntegerField('Size', validators=[DataRequired()])
    is_available = BooleanField('Is Available')
    year_built = IntegerField('Year Built', validators=[DataRequired()])
    bedrooms = IntegerField('Bedrooms', validators=[DataRequired()])
    bathrooms = IntegerField('Bathrooms', validators=[DataRequired()])
    parking = BooleanField('Parking')
    laundry = BooleanField('Laundry')
    address = StringField('Address', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    # zipcode = IntegerField('Zipcode', validators=[DataRequired()])
    url1 = StringField('Url1', validators=[DataRequired()])
    url2 = StringField('Url2', validators=[DataRequired()])
    url3 = StringField('Url3', validators=[DataRequired()])
    user_id = IntegerField('UserId', validators=[DataRequired()])
    agent_id = IntegerField('AgentId', validators=[DataRequired()])
    lat=FloatField("Lat")
    lng=FloatField("Lng")
    # images_of_listing = StringField("Image", validators=[DataRequired()])

class ListingUpdateForm(FlaskForm):
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    is_available = BooleanField('Is Available')
    url1 = StringField('Url1', validators=[DataRequired()])
    url2 = StringField('Url2', validators=[DataRequired()])
    url3 = StringField('Url3', validators=[DataRequired()])
    # user_id = IntegerField('UserId', validators=[DataRequired()])
