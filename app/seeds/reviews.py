from app.models import db, Review

def seed_reviews():
    review1 = Review(
        rating=3,
        comment='Not the bets agent',
        user_id=1,
        agent_id=1
    )

    review2 = Review(
        rating=4,
        comment='Great Agent',
        user_id=2,
        agent_id=2
    )

    review3 = Review(
        rating=1,
        comment='Horrible agent',
        user_id=3,
        agent_id=3
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
