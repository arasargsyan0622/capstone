from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField, SelectField
from wtforms.validators import DataRequired

class ReviewCreateForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    rating = StringField('Rating', validators=[DataRequired()])
    user_id = IntegerField("userId", validators=[DataRequired()])
    agent_id = IntegerField("agentId", validators=[DataRequired()])

class ReviewUpdateForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    rating = SelectField('Rating', validators=[DataRequired()])
