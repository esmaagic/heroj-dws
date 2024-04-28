"""Initial migration

Revision ID: 5bc5303c77ac
Revises: c43539bd6247
Create Date: 2024-04-27 21:27:47.619898

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5bc5303c77ac'
down_revision: Union[str, None] = 'c43539bd6247'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column('users', 'name')


def downgrade() -> None:
    pass
