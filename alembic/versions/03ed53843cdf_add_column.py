"""Add column

Revision ID: 03ed53843cdf
Revises: 5bc5303c77ac
Create Date: 2024-04-27 21:29:18.050566

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '03ed53843cdf'
down_revision: Union[str, None] = '5bc5303c77ac'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
     op.add_column('users', sa.Column('name', sa.String()))


def downgrade() -> None:
    pass
