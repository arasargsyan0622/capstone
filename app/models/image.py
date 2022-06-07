from .db import db

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    agent_id = db.Column(db.Integer, db.ForeignKey('agents.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', backpopulate='images')
    listing = db.relationship('Listing', backpopulate='images')
    agent = db.relationship('Agent', backpopulate='images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'listing_id': self.listing_id,
            'title': self.title,
            'description': self.description,
            'agent_id': self.agent_id
        }
