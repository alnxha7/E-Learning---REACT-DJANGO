from django.db import models
from django.contrib.auth.models import User

class Courses(models.Model):
    title = models.CharField(max_length=99)
    duration_in_months = models.IntegerField()
    description = models.TextField()
    tools_using = models.TextField()
    image = models.ImageField(null=True, blank=True)
    cost = models.IntegerField(default=20000)

    def __str__(self):
        return self.title

class Students(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)