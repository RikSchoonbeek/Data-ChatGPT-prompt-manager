from dataclasses import dataclass
from typing import Iterable

from core.services import Command, Service
from data_source.models import Note, Tag
from user.models import AppUser


@dataclass
class CreateNoteCommand(Command):
    title: str
    content: str
    owner: AppUser
    tags: Iterable[Tag]


class CreateNoteService(Service):
    """
    Service for creating a new note and linking tags to it.
    """

    def _execute(self, command: Command):
        note = Note.objects.create(
            title=command.title,
            content=command.content,
            owner=command.owner,
        )
        note.tags.set(command.tags)
        return note


@dataclass
class UpdateNoteCommand(Command):
    id: int
    data: dict


class UpdateNoteService(Service):
    """
    Service for updating a note.
    """

    def _execute(self, command: Command):
        note = Note.objects.get(id=command.id)
        if 'tags' in command.data:
            note.tags.set(command.data['tags'])
            del command.data['tags']
        for attr, value in command.data.items():
            setattr(note, attr, value)
        note.save()
        return note