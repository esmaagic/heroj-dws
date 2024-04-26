from pydantic import BaseModel

class Role(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name : str
    lastname : str
    email : str
    role_id : int


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class ContentBase(BaseModel):
    title: str

class Content(ContentBase):
    id: int
    type_id: int
    content: str
    class Config:
        orm_mode = True