"""Initial migration2

Revision ID: 0c6ac5b109d9
Revises: 623c91231d93
Create Date: 2024-04-27 21:03:50.039384

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0c6ac5b109d9'
down_revision: Union[str, None] = '623c91231d93'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
