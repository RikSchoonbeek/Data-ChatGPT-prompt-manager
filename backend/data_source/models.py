from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('user.AppUser', on_delete=models.CASCADE)


class DataSource(models.Model):
    title = models.CharField(max_length=100)
    # content = content of data source
    tags = models.ManyToManyField(Tag)
    owner = models.ForeignKey('user.AppUser', on_delete=models.CASCADE)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title


class Note(DataSource):
    content = models.TextField()
