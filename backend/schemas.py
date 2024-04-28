from pydantic import BaseModel

class Role(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name : str
    lastname : str
    email : str
    role_id : int = 1


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class ContentBase(BaseModel):
    title: str

class Content(ContentBase):
    id: int
    type_id: int
    content: str
    class Config:
        from_attributes = True

