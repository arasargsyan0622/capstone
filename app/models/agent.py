from .db import db

class Agent(db.Model):
    __tablename__ = "agents"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    license_number = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text, nullable=False)
    photo = db.Column(db.String(255), nullable=False)

    listings = db.relationship('Listing', backpopulate='agent')
    reviews = db.relationship('Review', backpopulate='agent')
    images = db.relationship('Image', backpopulate='agent')
