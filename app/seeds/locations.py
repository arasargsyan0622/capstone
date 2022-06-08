from app.models import db, Location

def seed_locations():
    home = Location(
        address='123 Main St',
        city='New York',
        state='NY',
        country='USA',
        zipcode=10001
    )

    office = Location(
        address='123 Some St',
        city='New York',
        state='NY',
        country='USA',
        zipcode=10234
    )

    bar = Location(
        address='123 Cool st',
        city='New York',
        state='NY',
        country='USA',
        zipcode=10345
    )

    db.session.add(home)
    db.session.add(office)
    db.session.add(bar)

    db.session.commit()

def undo_locations():
    db.session.execute('TRUNCATE locations RESTART IDENTITY CASCADE;')
    db.session.commit()
