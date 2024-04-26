from sqlalchemy.orm import Session

from . import models, schemas

# kao controllers u node.js



def get_contents(db: Session):
    return db.query(models.Content).all()
