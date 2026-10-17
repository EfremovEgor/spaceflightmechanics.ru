from django.urls import path

from apps.registrations.views import RegisterView

from .views import EditionDetailView, EditionListView

urlpatterns = [
    path("editions/", EditionListView.as_view(), name="edition-list"),
    path("editions/<slug:slug>/", EditionDetailView.as_view(), name="edition-detail"),
    path("editions/<slug:slug>/register/", RegisterView.as_view(), name="edition-register"),
]
