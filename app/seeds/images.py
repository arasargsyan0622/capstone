from app.models import db, Image

def seed_images():
    image1 = Image(
        image='https://photos.zillowstatic.com/fp/7042992ea5680c5022dae51299c9f55e-p_e.jpg',
        listing_id=1,
        title='House',
        description='This is a house',
        user_id=1
    )

    image2 = Image(
        image='https://photos.zillowstatic.com/fp/f5120a1a8e5f1b68c6fc821cb3bfaf1b-p_e.jpg',
        listing_id=2,
        title='Apartment',
        description='This is an apartment',
        user_id=2
    )

    image3 = Image(
        image='https://photos.zillowstatic.com/fp/d68ae27403ec8e55cec62eacce3480b8-p_e.jpg',
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
