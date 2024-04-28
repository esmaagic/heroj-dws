"""Initial migration

Revision ID: c43539bd6247
Revises: 99c65b467c03
Create Date: 2024-04-27 21:07:53.450017

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c43539bd6247'
down_revision: Union[str, None] = '99c65b467c03'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
