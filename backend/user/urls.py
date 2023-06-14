from django.urls import path
from user import views

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/change-password/', views.change_password, name='change_password'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/reset-password/', views.reset_password_request, name='reset_password_request'),
    path('auth/password-reset/<str:uid>/<str:token>/', views.reset_password_confirm, name='reset_password_confirm'),
    path('auth/get_csrf_cookie/', views.get_csrf_cookie, name='get_csrf_cookie'),
]
