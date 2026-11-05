#!/usr/bin/python3
"""Define the User model for Washvia user accounts."""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String

class User(BaseModel, Base):
    """Represents a user account in the Washvia system.

    Attributes:
        email (str): The user's email address.
        password (str): The user's password.
        first_name (str): The user's first name.
        last_name (str): The user's last name.
    """
    __tablename__ = 'users'

    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    address = Column(String(256), nullable=True)
    phone_number = Column(String(20), nullable=True)
    
    def __init__(self, *args, **kwargs):
        """Initialize a new User instance or restore its attributes from keyword arguments."""
        super().__init__(*args, **kwargs)