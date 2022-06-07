from .db import db

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))

    bookings_user = db.relationship('User', back_populates='user_bookings')
    listing_booking = db.relationship('Listing', back_populates='bookings_listing')

    def to_dict(self):
        return {
            'id': self.id,
            'start_date': self.start_date,
            'userId': self.userId,
            'listing_id': self.listing_id
        }
