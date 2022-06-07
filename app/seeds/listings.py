from app.models import db, Listing

def seed_listings():
    house = Listing(
        title='House',
        description='This is a house',
        price=2700,
        is_available=False,
        year_built=2000,
        size=1000,
        bedrooms=2,
        bathrooms=2,
        parking=True,
        laundry=True,
        user_id=1,
        location_id=1,
        agent_id=1
    )

    apartment = Listing(
        title='Apartment',
        description='This is an apartment',
        price=1800,
        is_available=True,
        year_built=2010,
        size=2000,
        bedrooms=3,
        bathrooms=3,
        parking=False,
        laundry=False,
        user_id=2,
        location_id=2,
        agent_id=2
    )

    condo = Listing(
        title='Condo',
        description='This is a condo',
        price=2200,
        is_available=False,
        year_built=2012,
        size=3000,
        bedrooms=4,
        bathrooms=4,
        parking=True,
        laundry=True,
        user_id=3,
        location_id=3,
        agent_id=3
    )



    db.session.add(house)
    db.session.add(apartment)
    db.session.add(condo)

    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
