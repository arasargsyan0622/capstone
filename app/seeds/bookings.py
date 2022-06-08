from app.models import db, Booking

def seed_bookings():
    booking1 = Booking(
        start_date='2020-01-01T9:00:00',
        userId=1,
        listing_id=1
    )

    booking2 = Booking(
        start_date='2020-01-01T10:00:00',
        userId=2,
        listing_id=2
    )

    booking3 = Booking(
        start_date='2020-01-01T11:00:00',
        userId=3,
        listing_id=3
    )

    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)

    db.session.commit()

def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
