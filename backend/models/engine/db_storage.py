#!/usr/bin/python3
"""This module defines the database storage engine for Washvia using
SQLAlchemy.
"""

from os import getenv
from sqlalchemy import create_engine, desc
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base
from models.service_req import ServiceReq


class DBStorage:
    """Database storage engine for Washvia using SQLAlchemy.

    This class manages the connection to the database, handles sessions, and
    provides methods for interacting with the database.

    Attributes:
        __engine: The SQLAlchemy engine instance.
        __session: The SQLAlchemy session instance.
    """

    __engine = None
    __session = None

    def __init__(self):
        """Initialize the DBStorage instance by creating a database engine."""
        user = getenv('WASHVIA_MYSQL_USER')
        password = getenv('WASHVIA_MYSQL_PWD')
        host = getenv('WASHVIA_MYSQL_HOST')
        db_name = getenv('WASHVIA_MYSQL_DB')
        connection_url = f'mysql+mysqldb://{user}:{password}@{host}/{db_name}'
        self.__engine = create_engine(connection_url, pool_pre_ping=True)

    def all(self, cls=None):
        """Query all objects of a given class from the database.

        Args:
            cls: The class of objects to query. If None, query all classes.

        Returns:
            A dictionary of objects with keys in the format
            <class name>.<object id>.
        """
        obj_dict = {}
        session = self.__session
        if session is None:
            return obj_dict
        if cls is None:
            for subclass in Base.__subclasses__():
                objs = session.query(subclass).all()
                for obj in objs:
                    key = f"{obj.__class__.__name__}.{obj.id}"
                    obj_dict[key] = obj
        else:
            objs = session.query(cls).all()
            for obj in objs:
                key = f"{obj.__class__.__name__}.{obj.id}"
                obj_dict[key] = obj
        return obj_dict

    def new(self, obj):
        """Add a new object to the current database session.

        Args:
            obj: The object to add to the session.
        """
        if self.__session is not None:
            self.__session.add(obj)

    def save(self):
        """Commit all changes made in the current database session."""
        if self.__session is not None:
            self.__session.commit()

    def delete(self, obj=None):
        """Delete an object from the current database session.

        Args:
            obj: The object to delete. If None, do nothing.
        """
        if obj is not None and self.__session is not None:
            self.__session.delete(obj)

    def reload(self):
        """Reload the database session and create all tables in the
        database."""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(
            bind=self.__engine, expire_on_commit=False
        )
        session = scoped_session(session_factory)
        self.__session = session()

    def close(self):
        """Close the current database session."""
        if self.__session is not None:
            self.__session.close()

    def get(self, cls, id):
        """Retrieve an object based on its class and ID.

        Args:
            cls: The class of the object to retrieve.
            id: The ID of the object to retrieve.

        Returns:
            The object if found, otherwise None.
        """
        if cls is None or id is None or self.__session is None:
            return None
        return self.__session.query(cls).get(id)

    def get_by_email(self, cls, email):
        """Retrieve an object based on its class and email.

        Args:
            cls: The class of the object to retrieve.
            email: The email of the object to retrieve.

        Returns:
            The object if found, otherwise None.
        """
        if cls is None or email is None or self.__session is None:
            return None
        return self.__session.query(cls).filter_by(email=email).first()

    def count(self, cls=None):
        """Count the number of objects in the database.

        Args:
            cls: The class of objects to count. If None, count all objects.

        Returns:
            The number of objects in the database.
        """
        session = self.__session
        if session is None:
            return 0
        if cls is None:
            return session.query(Base).count()
        return session.query(cls).count()

    def get_orders_for_user(self, user_id):
        """Return a customer's orders, newest first."""
        session = self.__session
        if session is None:
            return []
        return (
            session.query(ServiceReq)
            .filter_by(user_id=user_id)
            .order_by(
                ServiceReq.__table__.c.created_at.desc(),
                ServiceReq.__table__.c.id.desc(),
            )
            .all()
        )
