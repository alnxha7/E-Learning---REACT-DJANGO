from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Courses, Students
from .serializers import RegisterSerializer, CourseSerializer
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})

@api_view(['GET'])
def get_courses(request):
    courses = Courses.objects.all()
    data = [{
        'id': c.id,
        'title': c.title,
        'duration': c.duration_in_months, 
        'description': c.description, 
        'tools': c.tools_using,
        "image": request.build_absolute_uri(c.image.url) if c.image else None
    } for c in courses ]
    return Response(data)


@csrf_exempt
@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        if not user.is_superuser:
            login(request, user)
            return Response({"message": "Login successful!", 'email': user.email}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Admin cannot login here"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"detail": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def logout_view(request):
    logout(request)  # Clear the session
    return Response({'message': 'Logged out successfully'})
    
    
@api_view(['GET'])
def course_detail(request, course_id):
    try:
        course = Courses.objects.get(id=course_id)
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data)
    except Courses.DoesNotExist:
        return Response(status=404)
    
@api_view(['GET'])
def get_courses_with_id(request):
    courses = Courses.objects.all()
    serializer = CourseSerializer(courses, many=True, context={'request': request})
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def change_password(request):
    username = request.data.get('username')
    current_password = request.data.get('current')
    new_password = request.data.get('new')

    user = authenticate(username=username, password=current_password)

    if user is not None:
        if user.is_superuser:
            return Response({'detail': 'Admin password change not allowed'}, status=status.HTTP_403_FORBIDDEN)
        
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Current password is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    
@csrf_exempt
@api_view(['POST'])
def enroll_course(request):
    try:
        course_id = request.data.get('course_id')
        course = Courses.objects.get(id=course_id)
        user = request.user
        print(user.username)

        if not course_id or not str(course_id).isdigit():
            return Response({"detail": "Invalid course ID"}, status=400)

        if Students.objects.filter(user=user, course=course).exists():
            return Response({"detail": "Already enrolled in this course."}, status=400)
        
        Students.objects.create(user=user, course=course)
        return Response({"message": "Enrolled successfully."}, status=201)
    
    except Exception as e:
        return Response({"detail": str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def enroll_status(request):
    course_id = request.GET.get('course_id')
    if not course_id:
        return Response({'enrolled': False})

    enrolled = Students.objects.filter(user=request.user, course_id=course_id).exists()
    return Response({'enrolled': enrolled})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_courses(request):
    student_courses = Students.objects.filter(user=request.user).select_related('course')
    data = []

    for student in student_courses:
        course = student.course
        course_data = CourseSerializer(course, context={'request': request}).data
        course_data['start_date'] = student.date.strftime('%Y-%m-%d')
        data.append(course_data)

    print(data)  # Debug line

    return Response(data)