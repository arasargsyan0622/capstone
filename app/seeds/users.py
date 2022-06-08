from app.models import db, User
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name="Lition", email='demo@aa.io', hashed_password=generate_password_hash('password'))
    Paul = User(
        first_name='Dukey', last_name="Silver", email='duke@silver.io', hashed_password=generate_password_hash('password'))
    Chris = User(
        first_name='poop', last_name="stain", email='poop@stain.io', hashed_password=generate_password_hash('password123'))
    Darren = User(
        first_name='ComeEat', last_name="ChinaCity", email="china@city.io", hashed_password=generate_password_hash('password'))
    Vern = User(
        first_name='Drip', last_name="God", email="drip@god.io", hashed_password=generate_password_hash('password'))
    Ara = User(
        first_name='Zen', last_name="san", email="zen@san.io", hashed_password=generate_password_hash('password'))

    db.session.add(demo)
    db.session.add(Paul)
    db.session.add(Chris)
    db.session.add(Darren)
    db.session.add(Vern)
    db.session.add(Ara)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
