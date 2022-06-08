from app.models import db, Image

def seed_images():
    image1 = Image(
        url='',
        listing_id=1,
        title='House',
        description='This is a house',
        user_id=1
    )

    image2 = Image(
        url='',
        listing_id=2,
        title='Apartment',
        description='This is an apartment',
        user_id=2
    )

    image3 = Image(
        url='',
        listing_id=3,
        title='Condo',
        description='This is a condo',
        user_id=3
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()

