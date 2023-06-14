from django.urls import include, path
from rest_framework import routers
from .views import NoteViewSet

app_name = 'data_source'

router = routers.DefaultRouter()
router.register(r'note', NoteViewSet, 'note')

urlpatterns = [
    path('', include(router.urls)),
]