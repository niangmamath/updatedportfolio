from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('projets/', views.projects, name='projects'),
    path('projets/<slug:slug>/', views.project_detail, name='project_detail'),
    path('projets/<slug:slug>/rapport.pdf', views.pdf_proxy, name='pdf_proxy'),
    path('contact/', views.contact, name='contact'),
]
