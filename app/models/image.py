from .db import db

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    images_user = db.relationship('User', back_populates='user_images')
    listing_images = db.relationship('Listing', back_populates='images_of_listing')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'listing_id': self.listing_id,
            'title': self.title,
            'description': self.description,
            'agent_id': self.agent_id
        }
