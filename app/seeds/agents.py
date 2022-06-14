from app.models import db, Agent

def seed_agents():
    Chris = Agent(
        first_name='Chris',
        last_name='Threadgill',
        email='chris92@gmail.com',
        phone='123-456-7890',
        location="Fayetteville, AR",
        company='Threadgill',
        license_number='123456789',
        bio='I am a real estate agent',
        photo='https://cdn.discordapp.com/attachments/978771595025862706/984191457340571779/IMG_2207.jpg',
        github='https://github.com/ChrisThreadgill',
        linkedin='https://www.linkedin.com/in/chris-threadgill-b05090185/',
        rating=5
    )

    Darren = Agent(
        first_name='Darren',
        last_name='Kong',
        email='dkong@gmail.com',
        phone='123-456-7891',
        location="Antioch, CA",
        company='Kong',
        license_number='123456791',
        bio='I am a real estate agent',
        photo='https://cdn.discordapp.com/attachments/978771595025862706/984186141131567184/20211106_101658.jpg',
        github='https://github.com/dkong1321',
        linkedin='https://www.linkedin.com/in/darren-kong-06b47013b/',
        rating=5
    )

    Paul = Agent(
        first_name='Paul',
        last_name='Melhus',
        email='paulerik@gmail.com',
        phone='123-456-7892',
        location="Philadelphia, PA",
        company='Melhus',
        license_number='123456792',
        bio='I am a real estate agent, I promise',
        photo='https://cdn.discordapp.com/attachments/978771223897047092/984191561069907998/IMG_0760.jpg',
        github='https://github.com/pmelhus',
        linkedin='https://www.linkedin.com/in/paulmelhus/',
        rating=5
    )

    Vern = Agent(
        first_name='Vernyoon',
        last_name='Chao',
        email="vernch@gmail.com",
        phone='123-456-7893',
        location="Oakland, CA",
        company='Chao',
        license_number='123456793',
        bio='I am a real estate agent',
        photo='https://cdn.discordapp.com/attachments/978771595025862706/984187014859620412/unknown.png',
        github='https://github.com/VernyoonChao98',
        linkedin="https://www.linkedin.com/in/vernyoon-chao-783494123/",
        rating=5
    )

    Leo = Agent(
        first_name='Leo',
        last_name='Lapedo',
        email="leo@lapd.com",
        phone='123-456-7894',
        location="Washington, D.C.",
        company='Leo',
        license_number='123456794',
        bio='I am a fake agent',
        photo='https://cdn.discordapp.com/attachments/978771595025862706/984189842533515284/Snapchat-2113315832.jpg',
        github='https://github.com/Dedition',
        linkedin="https://www.linkedin.com/in/leo-l-79a260b0/",
        rating=5
    )


    db.session.add(Chris)
    db.session.add(Darren)
    db.session.add(Paul)
    db.session.add(Vern)
    db.session.add(Leo)
    db.session.commit()

def undo_agents():
    db.session.execute('TRUNCATE agents RESTART IDENTITY CASCADE;')
    db.session.commit()
