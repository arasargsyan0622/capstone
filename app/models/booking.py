from .db import db

class Bookings(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))

    user = db.relationship('User', backpopulate='bookings')
    location = db.relationship('Location', backpopulate='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'start_date': self.start_date,
            'userId': self.userId,
            'location_id': self.location_id
        }
