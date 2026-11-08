# new_dict = self.__dict__.copy()

# for field in ("created_at", "updated_at"):
#     value = new_dict.get(field)
#     if value is not None:
#         new_dict[field] = value.strftime(time)

# new_dict["__class__"] = type(self).__name__
# new_dict.pop("_sa_instance_state", None)

# if save_fs is None:
#     new_dict.pop("password", None)

# return new_dict