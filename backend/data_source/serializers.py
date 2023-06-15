from rest_framework import serializers

from data_source.models import Note, Tag
from user.models import AppUser


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
        

class NoteSerializer(serializers.ModelSerializer):
    # tags = TagSerializer(many=True, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(
        queryset=AppUser.objects.all(),
    )
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
    )

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'owner', 'tags']