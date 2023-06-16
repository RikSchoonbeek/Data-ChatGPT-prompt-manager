from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .models import Note
from .serializers import NoteSerializer
from .services import (
    CreateNoteCommand, 
    CreateNoteService, 
    UpdateNoteCommand, 
    UpdateNoteService,
)


class NoteViewSet(GenericViewSet):

    queryset = Note.objects.filter(deleted_dt=None)

    def create(self, request):
        # Validate request data
        serializer = NoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        command = CreateNoteCommand(
            title=serializer.validated_data['title'],
            content=serializer.validated_data['content'],
            owner=serializer.validated_data['owner'],
            tags=serializer.validated_data['tags'],
        )
        note = CreateNoteService()(command)

        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def list(self, request):
        notes = self.queryset.filter(owner_id=1)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # update (PUT) may not be necessary right now
    
    def partial_update(self, request, pk):
        # Validate request data
        note = self.queryset.get(id=pk)
        serializer = NoteSerializer(note, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        updated_note = UpdateNoteService()(UpdateNoteCommand(id=pk, data=serializer.validated_data, note=note))

        response_serializer = NoteSerializer(updated_note)
        return Response(response_serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, pk):
        note = self.queryset.get(id=pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def retrieve(self, request, pk):
        note = self.queryset.get(id=id)
        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_200_OK)
