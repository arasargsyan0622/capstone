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
        url1='https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1014598438%2F0%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY0NzQyMjM5Mw%2FqqNV7J7CnwumL-0ATMSVIB35P3nNc82WCdAS6GDznc8&quality=0.8&webp=true&sig_id=69&width=1100',
        url2='https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1014598438%2F9%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY0NzQyMjM5Mw%2FTMZAlHencoH0CsKh3b9ouHSUMWz6SIhdhoBNXcOREQg&quality=0.8&webp=true&sig_id=69&width=1100',
        url3='https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1014598438%2F13%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY0NzQyMjM5Mw%2FwP9oOLGTqnAhwB5M_ozYK7J57GGJ6FNdrdX19B1FwV8&quality=0.8&webp=true&sig_id=69&width=1100',
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
        url1="https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1004066072%2F0%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY1NDg5NTIwMw%2FzjQCNg-9tB-xhPP4r-HIT9wRyN8cIjv0URxzQBlmQ1A&quality=0.8&webp=true&sig_id=69&width=1100",
        url2="https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1004066072%2F5%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY1NDg5NTIwMw%2F4iexOhUhX2SYJDeZLMbWhsp1e6QPphWBuYEFjMsJMVE&quality=0.8&webp=true&sig_id=69&width=1100",
        url3="https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1004066072%2F3%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY1NDg5NTIwMw%2F2NrJwZYbVyxTi2umEB5b3zz6mSCeZdYVcApgDQ2k0co&quality=0.8&webp=true&sig_id=69&width=1100",
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
        url1="https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1018569234%2F1%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY1NDY4MjQwNQ%2FpuTVLo_-yJtmWv_2Bq5vgAijTzdjG9y5ZsDWN9_FXbM&quality=0.8&webp=true&sig_id=69&width=1100",
        url2="https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1018569234%2F6%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY1NDY4MjQwNQ%2FlEZ-LDThIl8PtiFLO5qrDsmcGFhsewM6xJZVf1UMvKM&quality=0.8&webp=true&sig_id=69&width=1100",
        url3="https://cflare.smarteragent.com/rest/Resizer?url=https%3A%2F%2Fapi-prod.corelogic.com%2Ftrestle%2FMedia%2FCRMLS%2FProperty%2FPHOTO-jpeg%2F1018569234%2F17%2FMTU0Mi80MjgvMTk%2FMTkvMTAyOTcvMTY1NDY4MjQwNQ%2FjVLF32P_IWfoWiPLgCU4aOEC_4Ys-A7Rp-juqaafmuY&quality=0.8&webp=true&sig_id=69&width=1100",
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
