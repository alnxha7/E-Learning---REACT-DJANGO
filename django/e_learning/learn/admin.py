from django.contrib import admin
from .models import Courses, Students

admin.site.register(Courses)


class StudentsAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'date')        
    list_filter = ('course', 'date')                  
    search_fields = ('user__username', 'course__title') 
    ordering = ('-date',)                              
    date_hierarchy = 'date'                            

admin.site.register(Students, StudentsAdmin)
