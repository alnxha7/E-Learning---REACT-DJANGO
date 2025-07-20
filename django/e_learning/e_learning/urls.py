"""
URL configuration for e_learning project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from learn import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/csrf/', views.get_csrf_token, name='get_csrf'),

    path('admin/', admin.site.urls),
    path('api/courses/', views.get_courses, name='get_courses'),

    path('api/register/', views.register_user, name='register_user'),
    path('api/login/', views.login_user, name='login_user'),
    path('api/logout/', views.logout_view, name='logout'),
    
    path('api/courses/<int:course_id>/', views.course_detail, name='course_detail'),
    path('api/courses/full/', views.get_courses_with_id, name='get_courses_with_id'),

    path('api/change-password/', views.change_password, name='change_password'),

    path('api/enroll/', views.enroll_course, name='enroll_course'),
    path('api/enroll-status/', views.enroll_status, name='enroll_status'),

    path('api/my-courses/', views.my_courses, name='my-courses'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)