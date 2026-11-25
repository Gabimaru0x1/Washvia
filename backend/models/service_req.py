#!/usr/bin/python3
"""Defines the ServiceReq class."""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship


class ServiceReq(BaseModel, Base):
    """Represents a user service request

     Attributes:
            user_id (str): User's id who requested the service.
            service (str): Type of service requested.
            pickup_address (str): User's address for pick up & delivery.
            status (str): Status of the requested service.
            picked_up_on (dt): Picked up date and time.
    """

    __tablename__ = 'service_req'

    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    service = Column(String(40), nullable=False)
    pickup_address = Column(String(128), nullable=False)
    status = Column(String(20), default="scheduled", nullable=False)
    picked_up_on = Column(DateTime, nullable=True)
    delivered_on = Column(DateTime, nullable=True)
    user = relationship("User", back_populates="service_requests")

    def __init__(self, *args, **kwargs):
        """Initialize a User or restore its attributes from keyword
        arguments.
        """
        super().__init__(*args, **kwargs)
