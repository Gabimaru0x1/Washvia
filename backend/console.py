#!/usr/bin/python3
"""Provide a command-line interface for managing Washvia models."""

import cmd
import shlex
from models import storage
from models.user import User


class Console(cmd.Cmd):
    """Handle commands to create, view, update, and delete model instances."""
    
    intro = "Washvia console. Type help or ? to list commands."
    prompt = "washvia> "

    def do_exit(self, _arg):
        """Exit the console."""
        return True

    def do_quit(self, arg):
        """Exit the console (alias for exit)."""
        return self.do_exit(arg)

    def do_EOF(self, arg):
        """Exit the console on end-of-file (Ctrl-D/Ctrl-Z)."""
        print()
        return self.do_exit(arg)

    def emptyline(self):
        """Do nothing upon receiving an empty line."""
        pass
    
    def do_create(self, arg):
        """Create an instance using supplied attributes.

        Usage: create User email="gabi@example.com" first_name="Gabi"
        """
        try:
            args = shlex.split(arg)
        except ValueError as error:
            print(f"** invalid input: {error} **")
            return

        if not args:
            print("** class name missing **")
            return

        classes = {"User": User}
        cls_name = args[0]

        if cls_name not in classes:
            print("** class doesn't exist **")
            return

        allowed_fields = {
            "email",
            "first_name",
            "last_name",
            "address",
            "phone_number",
            "password"
        }
        attributes = {}

        for item in args[1:]:
            if "=" not in item:
                print(f"** expected key=value: {item} **")
                return

            key, value = item.split("=", 1)

            if key not in allowed_fields:
                print(f"** unsupported attribute: {key} **")
                return

            attributes[key] = value

        if not attributes.get("email", "").strip():
            print("** email is required **")
            return
        elif not attributes.get("password", "").strip():
            print("** password is required **")
            return

        obj = classes[cls_name]()

        for key, value in attributes.items():
            setattr(obj, key, value)

        obj.save()
        print(obj.id)
    
    def do_show(self, cls_name):
        """Show the string representation of an instance based on class name and ID.

        Usage: show <class_name> <id>
        """
        args = cls_name.split()
        if len(args) < 2:
            print("** class name or id missing **")
            return
        cls_name, obj_id = args[0], args[1]
        try:
            cls = globals()[cls_name]
            obj = storage.get(cls, obj_id)
            if obj:
                print(obj)
            else:
                print("** no instance found **")
        except KeyError:
            print("** class doesn't exist **")
            
    def do_destroy(self, cls_name):
        """Delete an instance based on class name and ID.

        Usage: destroy <class_name> <id>
        """
        args = cls_name.split()
        if len(args) < 2:
            print("** class name or id missing **")
            return
        cls_name, obj_id = args[0], args[1]
        try:
            cls = globals()[cls_name]
            obj = storage.get(cls, obj_id)
            if obj:
                obj.delete()
                storage.save()
                print(f"Instance {obj_id} of class {cls_name} deleted.")
            else:
                print("** no instance found **")
        except KeyError:
            print("** class doesn't exist **")
            
    def do_all(self, cls_name):
        """Show all instances of a class, or all instances if no class is specified.

        Usage: all [<class_name>]
        """
        if cls_name:
            try:
                cls = globals()[cls_name]
                objs = storage.all(cls)
            except KeyError:
                print("** class doesn't exist **")
                return
        else:
            objs = storage.all()
        
        obj_list = [str(obj) for obj in objs.values()]
        print(obj_list)

if __name__ == "__main__":
    Console().cmdloop()
