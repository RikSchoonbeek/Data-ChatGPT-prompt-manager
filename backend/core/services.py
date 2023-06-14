from dataclasses import dataclass

from django.db import transaction


@dataclass
class Command:
    """Base class for all service commands"""
    pass


class Service:
    """Base class for all services. Services contain business logic."""
    _db_transation = True

    def _execute(self, command):
        raise NotImplementedError()
    
    def __call__(self, command):
        if self._db_transation:
            with transaction.atomic():
                return self._execute(command)
        else:
            return self._execute(command)
