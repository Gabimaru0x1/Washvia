#!/usr/bin/python3
"""Defines the ServiceReq class."""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime
from datetime import datetime

class ServiceReq(BaseModel, Base):
    """Represents a user service request
    
     Attributes:
            user_id (str): User's id who requested the service.
            service (str): Type of service requested.
            pickup_address (str): User's address for pick up & delivery.
            status (str): Status of the requested service.
            picked_up_on (dt): Picked up date
    """
    __tablename__ = 'service_req'

    user_id = Column(String(60), nullable=False)
    service = Column(String(40), nullable=False)
    pickup_address = Column(String(128), nullable=False)
    status = Column(String(20), default="scheduled", nulable=False)
    picked_up_on = Column(DateTime, default=datetime.utcnow, nullable=True)
    delivered_on = Column(DateTime, default=datetime.utcnow, nullable=True)