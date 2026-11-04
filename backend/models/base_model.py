#!/usr/bin/python3
"""Defines the BaseModel class shared by Washvia models.

Provides common attributes and methods for object identification,
creation and update timestamps, and dictionary serialization.
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BaseModel:
    """Defines common attributes and methods inherited by Washvia models.

    Includes a unique identifier, creation and update timestamps,
    and methods for saving and dictionary serialization.
    """
    id = Column(String(60), primary_key=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __init__(self, *args, **kwargs):
        """Initialize a new instance or restore its attributes from keyword arguments."""
        if kwargs:
            for key, value in kwargs.items():
                if key == "created_at" or key == "updated_at":
                    value = datetime.fromisoformat(value)
                setattr(self, key, value)
            if 'id' not in kwargs:
                self.id = str(uuid.uuid4())
            if 'created_at' not in kwargs:
                self.created_at = datetime.utcnow()
            if 'updated_at' not in kwargs:
                self.updated_at = datetime.utcnow()
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = datetime.utcnow()
            
    def __str__(self):
        """Return a string representation containing the class name, ID, and attributes."""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"
    
    def save(self):
        """Update the modification timestamp and save the instance to storage."""
        self.updated_at = datetime.utcnow()
        
        from models import storage
        storage.new(self)
        storage.save()
        
    def to_dict(self):
        """Return a dictionary representation of the instance.

        Include the class name and convert timestamps to ISO format.
        """
        obj_dict = self.__dict__.copy()
        obj_dict['__class__'] = self.__class__.__name__
        obj_dict['created_at'] = self.created_at.isoformat()
        obj_dict['updated_at'] = self.updated_at.isoformat()
        return obj_dict
    
    def delete(self):
        """Delete the instance from storage."""
        from models import storage
        storage.delete(self)
        