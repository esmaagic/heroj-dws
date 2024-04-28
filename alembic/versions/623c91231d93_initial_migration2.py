"""Initial migration2

Revision ID: 623c91231d93
Revises: 8407407c4c55
Create Date: 2024-04-27 20:58:54.574114

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '623c91231d93'
down_revision: Union[str, None] = '8407407c4c55'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
