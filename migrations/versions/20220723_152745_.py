"""empty message

Revision ID: 777ae883040b
Revises: f90140e3e316
Create Date: 2022-07-23 15:27:45.829597

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '777ae883040b'
down_revision = 'f90140e3e316'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('listings', sa.Column('lat', sa.Float(), nullable=True))
    op.add_column('listings', sa.Column('lng', sa.Float(), nullable=True))
    op.drop_column('listings', 'longitude')
    op.drop_column('listings', 'latitude')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('listings', sa.Column('latitude', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    op.add_column('listings', sa.Column('longitude', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    op.drop_column('listings', 'lng')
    op.drop_column('listings', 'lat')
    # ### end Alembic commands ###
