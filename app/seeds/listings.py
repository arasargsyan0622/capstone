from app.models import db, Listing

def seed_listings():
    house = Listing(
        description='House 1',
        price=2700,
        is_available=False,
        year_built=2000,
        size=1000,
        bedrooms=2,
        bathrooms=2,
        parking=True,
        laundry=True,
        address='11066 Tamberly ln',
        city='Tujunga',
        state='CA',
        country='USA',
        lat=34.2062174,
        lng=-118.4725625,
        # url='https://photos.zillowstatic.com/fp/7042992ea5680c5022dae51299c9f55e-p_e.jpg',
        url1='https://photos.zillowstatic.com/fp/25778627da4de8beddf31a7e2183a14d-uncropped_scaled_within_1536_1152.webp',
        url2='https://photos.zillowstatic.com/fp/cc64183875e5004ab92ca8fd1e0ae329-uncropped_scaled_within_1536_1152.webp',
        url3='https://photos.zillowstatic.com/fp/debc292f72ee7a4a99b7d38df94568fd-uncropped_scaled_within_1536_1152.webp',
        user_id=1,
        agent_id=1
    )

    apartment = Listing(
        description='House 2',
        price=1800,
        is_available=True,
        year_built=2010,
        size=2000,
        bedrooms=3,
        bathrooms=3,
        parking=False,
        laundry=False,
        address='7440 Firmament avenue',
        city='Van Nuys',
        state='CA',
        country='USA',
        lat=33.998957,
        lng=-118.4396316,
        # url='https://photos.zillowstatic.com/fp/f5120a1a8e5f1b68c6fc821cb3bfaf1b-p_e.jpg',
        url1="https://photos.zillowstatic.com/fp/3afe3187507a1e93f1c202b9286eb0b5-uncropped_scaled_within_1536_1152.webp",
        url2="https://photos.zillowstatic.com/fp/0e63cb3590da8de4a14e9286ef5013dd-uncropped_scaled_within_1536_1152.webp",
        url3="https://photos.zillowstatic.com/fp/eb78880b5070e18a4bc3ebd87dc6b483-uncropped_scaled_within_1536_1152.webp",
        user_id=2,
        agent_id=2
    )

    condo = Listing(
        description='House 3',
        price=2200,
        is_available=False,
        year_built=2012,
        size=3000,
        bedrooms=4,
        bathrooms=4,
        parking=True,
        laundry=True,
        address='12806 Pacific Avenue',
        city='Los Angeles',
        state='CA',
        country='USA',
        lat=34.2062174,
        lng=-118.4725625,
        # url='https://photos.zillowstatic.com/fp/d68ae27403ec8e55cec62eacce3480b8-p_e.jpg',
        url1="https://photos.zillowstatic.com/fp/6aedde664dd5d42e8c7d15845111c103-uncropped_scaled_within_1536_1152.webp",
        url2="https://photos.zillowstatic.com/fp/45e2c3e3419e73735457f1aba3859549-uncropped_scaled_within_1536_1152.webp",
        url3="https://photos.zillowstatic.com/fp/fcc2e6becda86281e0114482fb4e5027-uncropped_scaled_within_1536_1152.webp",
        user_id=3,
        agent_id=3
    )



    db.session.add(house)
    db.session.add(apartment)
    db.session.add(condo)

    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
