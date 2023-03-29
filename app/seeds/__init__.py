from flask.cli import AppGroup
from .users import seed_users, undo_users
from .listings import seed_listings, undo_listings
# from .locations import seed_locations, undo_locations
from .agents import seed_agents, undo_agents
from .bookings import seed_bookings, undo_bookings
from .images import seed_images, undo_images
from .reviews import seed_reviews, undo_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_agents()
    # seed_locations()
    seed_listings()
    seed_bookings()
    seed_images()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_listings()
    # undo_locations()
    undo_agents()
    undo_bookings()
    undo_images()
    undo_reviews()
    # Add other undo functions here
