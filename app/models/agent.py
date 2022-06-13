from .db import db

class Agent(db.Model):
    __tablename__ = "agents"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    license_number = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text, nullable=False)
    photo = db.Column(db.String(255), nullable=False)

    listing_agent = db.relationship('Listing', back_populates='agent_of_listing')
    reviews_agent = db.relationship('Review', back_populates='agent_review')

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'license_number': self.license_number,
            'bio': self.bio,
            'photo': self.photo,
            'location': self.location
            # 'reviews_agent': self.reviews_agent
        }
