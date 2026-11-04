#!/usr/bin/python3
"""Initialize the models package and its shared storage instance."""

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()