from app.models import db, Agent

def seed_agents():
    Chris = Agent(
        first_name='Chris',
        last_name='Threadgill',
        email='chris92@gmail.com',
        phone='123-456-7890',
        company='Threadgill',
        license_number='123456789',
        bio='I am a real estate agent',
        photo=''
    )

    Darren = Agent(
        first_name='Darren',
        last_name='Kong',
        email='dkong@gmail.com',
        phone='123-456-7891',
        company='Kong',
        license_number='123456791',
        bio='I am a real estate agent',
        photo=''
    )

    Paul = Agent(
        first_name='Paul',
        last_name='Melhus',
        email='paulerik@gmail.com',
        phone='123-456-7892',
        company='Melhus',
        license_number='123456792',
        bio='I am a real estate agent, I promise',
        photo=''
    )

    Vern = Agent(
        first_name='Vernyoon',
        last_name='Chao',
        email="vernch@gmail.com",
        phone='123-456-7893',
        company='Chao',
        license_number='123456793',
        bio='I am a real estate agent',
        photo=''
    )


    db.session.add(Chris)
    db.session.add(Darren)
    db.session.add(Paul)
    db.session.add(Vern)

    db.session.commit()

def undo_agents():
    db.session.execute('TRUNCATE agents RESTART IDENTITY CASCADE;')
    db.session.commit()
