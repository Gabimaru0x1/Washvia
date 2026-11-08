#!/usr/bin/python3
"""Provide bcrypt helpers for hashing and verifying passwords."""
import bcrypt

def hash_password(password: str) -> str:
    """Hash a password with a fresh salt and return the hash as a string."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password: str, hashed: str) -> bool:
    """Return whether the supplied password matches the stored hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))