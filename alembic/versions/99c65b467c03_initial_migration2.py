"""Initial migration2

Revision ID: 99c65b467c03
Revises: 0c6ac5b109d9
Create Date: 2024-04-27 21:06:19.532456

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '99c65b467c03'
down_revision: Union[str, None] = '0c6ac5b109d9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
