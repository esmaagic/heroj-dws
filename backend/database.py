from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Muhamed Aletic
# It is necessary to enter your own data to connect to the database.
# Conncetion template
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost/db"
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root@localhost/heroj"


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

