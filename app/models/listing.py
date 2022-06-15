from .db import db

class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, nullable=False)
    year_built = db.Column(db.Integer, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    parking = db.Column(db.Boolean)
    laundry = db.Column(db.Boolean)
    address = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    agent_id = db.Column(db.Integer, db.ForeignKey('agents.id'))

    agent_of_listing = db.relationship('Agent', back_populates='listing_agent')
    owner_listing = db.relationship('User', back_populates='listings_owner')
    images_of_listing = db.relationship('Image', back_populates='listing_images')
    bookings_listing = db.relationship('Booking', back_populates='listing_booking')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'is_available': self.is_available,
            'year_built': self.year_built,
            'size': self.size,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'parking': self.parking,
            'laundry': self.laundry,
            'address': self.address,
            'country': self.country,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'user_id': self.user_id,
            'images_of_listing': [image_of_listing.to_dict() for image_of_listing in self.images_of_listing]
        }
