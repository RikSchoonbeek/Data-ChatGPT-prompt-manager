from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Logged in successfully.'})
        else:
            return Response({'error': 'Invalid username or password.'}, status=400)
    else:
        return Response({'error': 'Invalid request method.'}, status=405)


@api_view(['POST'])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return Response({'message': 'Logged out successfully.'})
    else:
        return Response({'error': 'Invalid request method.'}, status=405)


@api_view(['POST'])
def change_password(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            new_password = request.data.get('new_password')
            request.user.set_password(new_password)
            request.user.save()
            return Response({'message': 'Password changed successfully.'})
        else:
            return Response({'error': 'User is not authenticated.'}, status=401)
    else:
        return Response({'error': 'Invalid request method.'}, status=405)


@api_view(['POST'])
def reset_password_request(request):
    User = get_user_model()
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_400_BAD_REQUEST)
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk)).decode()
    reset_link = f'{settings.FRONTEND_URL}/reset-password/{uid}/{token}/'
    send_mail(
        'Password Reset',
        f'Please click the following link to reset your password: {reset_link}',
        settings.DEFAULT_FROM_EMAIL,
        # TODO email should be required for user registration
        [user.email],
        fail_silently=False,
    )
    return Response({'message': 'Password reset link sent successfully.'})


@api_view(['POST'])
def reset_password_confirm(request, uid, token):
    User = get_user_model()
    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)
    if not default_token_generator.check_token(user, token):
        return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)
    new_password = request.data.get('new_password')
    if not new_password:
        return Response({'error': 'New password is required.'}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password reset successfully.'})


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    User = get_user_model()
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    User.objects.create_user(username=username, password=password)
    return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)


# TODO I am currently not using this, as I kept walking into problems. I can implement this in the future
@api_view(['GET'])
@ensure_csrf_cookie
@authentication_classes([])
@permission_classes([])
def get_csrf_cookie(request):
    return Response("CSRF Cookie set.")
