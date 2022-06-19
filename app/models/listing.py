from .db import db

class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean)
    year_built = db.Column(db.Integer, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    parking = db.Column(db.Boolean)
    laundry = db.Column(db.Boolean)
    address = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(15), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    url1 = db.Column(db.Text, nullable=False)
    url2 = db.Column(db.Text, nullable=False)
    url3 = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    agent_id = db.Column(db.Integer, db.ForeignKey('agents.id'))

    agent_of_listing = db.relationship('Agent', back_populates='listing_agent')
    owner_listing = db.relationship('User', back_populates='listings_owner')
    images_of_listing = db.relationship('Image', back_populates='listing_images')
    bookings_listing = db.relationship('Booking', back_populates='listing_booking')

    def to_dict(self):
        return {
            'id': self.id,
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
            'url1': self.url1,
            'url2': self.url2,
            'url3': self.url3,
            'user_id': self.user_id,
            # 'images_of_listing': [image_of_listing.to_dict() for image_of_listing in self.images_of_listing]
        }
