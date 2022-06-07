from .db import db

class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, nullable=False)
    year_built = db.Column(db.Integer)
    size = db.Column(db.Integer)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    parking = db.Column(db.Boolean)
    laundry = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    agent_id = db.Column(db.Integer, db.ForeignKey('agents.id'))

    agent = db.relationship('Agent', backpopulate='listings')
    owner = db.relationship('User', backpopulate='listings')
    location = db.relationship('Location', backpopulate='listings')
    images = db.relationship('Image', backpopulate='listing')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'is_available': self.active,
            'year_built': self.year_built,
            'size': self.size,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'parking': self.parking,
            'laundry': self.laundry,
            'user_id': self.userId,
            'location_id': self.locationId
        }
